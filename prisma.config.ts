import { defineConfig } from "@prisma/config";

export default defineConfig({
    // earlyAccess: true,
    datasource: {
        url: "postgresql://postgres.ofxkeckgfxdthonilpfk:%23Jhonemil1213@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"
    }
});
