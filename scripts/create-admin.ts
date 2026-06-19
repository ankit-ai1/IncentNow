import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  // Fix admin@incentiq.com — plain text password → bcrypt hash
  const hash2 = await bcrypt.hash("incentiq@4001", 12);
  const { error: e2 } = await supabase
    .from("users")
    .update({ password: hash2 })
    .eq("email", "admin@incentiq.com");
  if (e2) console.error("Error updating incentiq user:", e2.message);
  else console.log("✅ Fixed: admin@incentiq.com / incentiq@4001");

  // Ensure admin@incentnow.com also has correct hash
  const hash1 = await bcrypt.hash("admin123!", 12);
  const { error: e1 } = await supabase
    .from("users")
    .update({ password: hash1 })
    .eq("email", "admin@incentnow.com");
  if (e1) console.error("Error updating incentnow user:", e1.message);
  else console.log("✅ Fixed: admin@incentnow.com / admin123!");
}

main();
