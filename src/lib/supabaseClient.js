import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bloiwimfnimonjqpznpv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsb2l3aW1mbmltb25qcXB6bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1OTUzNTUsImV4cCI6MjA4NDE3MTM1NX0.T4U7hmRtboIgYwi3GuKMwmK-9SNCAil5tuN4n7il6vc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
