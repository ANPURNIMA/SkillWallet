import { NextResponse } from 'next/server';

/**
 * GET /api/dashboard
 * Internal Next.js route that mirrors the Express logic for seamless frontend integration.
 */
export async function GET() {
  return NextResponse.json({
    status: "90% complete",
    epics: [
      { id: 1, title: "Environment Setup", completed: true },
      { id: 2, title: "Backend API Layer", completed: true },
      { id: 3, title: "AI Integration", completed: true },
      { id: 4, title: "React Frontend", completed: true },
      { id: 5, title: "Testing/Deployment", completed: false }
    ]
  });
}