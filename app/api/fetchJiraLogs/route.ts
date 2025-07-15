// pages/api/fetchJiraLogs.ts

import JiraClient from "jira-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, apiToken, startDate, endDate } = body;

  if (!username || !apiToken || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const jira = new JiraClient({
    protocol: "https",
    host: "tracking.i2cinc.com",
    username,
    password: apiToken,
    apiVersion: "2",
    strictSSL: true,
  });

  try {
    const jql = `worklogDate >= "${startDate}" AND worklogDate <= "${endDate}" AND worklogAuthor = currentUser()`;

    const searchResult = await jira.searchJira(jql, { maxResults: 500 });
    const issues = searchResult.issues;

    const allLogs = [];

    for (const issue of issues) {
      try {
        const worklogs = await jira.getIssueWorklogs(issue.id);

        for (const log of worklogs.worklogs) {
          if (log.author?.name === username) {
            const date = log.started.slice(0, 10);
            const hours = +(log.timeSpentSeconds / 3600).toFixed(2);

            allLogs.push({
              id: `${issue.key}-${log.id}`,
              date,
              user: log.author.displayName || username,
              issueKey: issue.key,
              issueType: issue.fields.issuetype.name,
              summary: issue.fields.summary,
              hours,
              description: log.comment || "",
            });
          }
        }
      } catch (error) {
        console.warn(`Error fetching worklogs for issue ${issue.key}`, error);
      }
    }

    return NextResponse.json(allLogs, { status: 200 });
  } catch (err) {
    console.log("JIRA API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch data from JIRA" },
      { status: 500 }
    );
  }
}
