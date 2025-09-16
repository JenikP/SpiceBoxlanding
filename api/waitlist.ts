import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

/*
 * This serverless function implements a simple waitlist API for Vercel.  It
 * accepts POST requests with a JSON body containing user details.  The payload
 * is validated using Zod.  If the email does not already exist in your
 * Supabase project it will create a new user with a temporary password and
 * then upsert the user's profile information into the `profiles` table.  For
 * existing users it reuses the user ID.  On GET requests it simply returns
 * a success response; you can extend this to fetch and return waitlist
 * entries if desired.
 */

// Define the shape of the waitlist payload.  Adjust this schema to match
// your own fields; unused fields will be ignored by Zod during parsing.
const waitlistSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('A valid email address is required'),
  suburb: z.string().min(1, 'Suburb is required'),
  dietaryPreference: z.string().min(1, 'Please select a dietary preference'),
  heardFrom: z.string().min(1, 'Please let us know where you heard about us'),
  phone: z.string().optional()
});

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      // Validate the incoming body against our schema.  The parse() call
      // throws if any field is missing or invalid.
      const data = waitlistSchema.parse(req.body);

      // Read environment variables.  VITE_SUPABASE_URL is used both on the
      // client and here in the API; SUPABASE_SERVICE_ROLE_KEY must have
      // administrative privileges since we need to create users.  These must
      // be configured in your Vercel project settings.
      const supabaseUrl = process.env.VITE_SUPABASE_URL!;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

      if (!supabaseUrl || !supabaseServiceKey) {
        return res.status(500).json({
          success: false,
          error: 'Missing Supabase environment variables'
        });
      }

      // Initialise the Supabase client using the service role key.  Note that
      // the service key should never be exposed on the client side; Vercel
      // automatically injects it into the API runtime.
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Check if a user with this email already exists.  listUsers() can
      // retrieve up to 10,000 users; adjust pagination if you have a large
      // user base.
      const { data: userList, error: listError } = await supabase.auth.admin.listUsers();
      if (listError) throw listError;
      const existingUser = userList.users.find(u => u.email === data.email);
      let userId: string;
      if (existingUser) {
        userId = existingUser.id;
      } else {
        // Create a new user with a temporary password.  The password is never
        // exposed to the customer; you can reset it or invite them to set a
        // password later.  The email_confirm flag bypasses the email
        // confirmation step.
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: data.email,
          password: 'TempPassword123!',
          email_confirm: true
        });
        if (authError) throw authError;
        userId = authData.user.id;
      }

      // Upsert the user's profile into the `profiles` table.  Note that the
      // database column for dietary preference in your original schema is
      // misspelled as "preferance"; we follow the same spelling here.
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: userId,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone ?? '',
        suburb: data.suburb,
        heard_from: data.heardFrom,
        dietaryPreferance: data.dietaryPreference
      });
      if (profileError) throw profileError;

      return res.status(200).json({ success: true, userId });
    } catch (err: any) {
      // If the error is thrown by Zod, provide detailed validation feedback
      if (err instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
      }
      // Otherwise return a generic message
      return res.status(500).json({ success: false, error: err?.message ?? 'Unknown error' });
    }
  }

  // Optionally handle GET requests.  For now we just return an empty array.
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, data: [] });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
