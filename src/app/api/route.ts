import { db } from "@/helpers/api/db";
import { NextResponse } from "next/server";
import { QueryTypes } from "sequelize";

export async function GET(res: NextResponse) {
    const result = await getGuidelines();
    return NextResponse.json({body: result});
  }

async function getGuidelines() {
    db.initialize();
    const results = await db.sequelize?.query("SELECT * FROM `guideline_references`", {type: QueryTypes.SELECT });
    return results;
}