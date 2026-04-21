#!/usr/bin/env bash
set -e

cat > config.js <<EOF
window.UNITED_LEARN_CONFIG = {
  SUPABASE_URL: "$SUPABASE_URL",
  SUPABASE_ANON_KEY: "$SUPABASE_ANON_KEY"
};
EOF

echo "Generated config.js with Supabase env vars."
