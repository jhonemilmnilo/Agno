import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "mysql://WmSk2xEwFA7sk9q.root:l3NykPXKFqLwzHYi@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/fortune500?ssl={\"rejectUnauthorized\":true}",
  },
});
