const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: Request) {
    try
    {
        const { question, llmModel, key, agents }: { question: string, llmModel: string, key: string, agents: string[] } = await req.json();
        const mapping = new Map<string, string>([
            ["맛집", "youtube_tool"],
            ["날씨", "weather_tool"],
            ["유튜브", "youtube_tool"],
        ]);
        
        const replacedAgents = agents.map(item => mapping.get(item) || item);
        const res = await fetch(`${API_BASE_URL}/v1/chatbot/togievelabs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, llmModel, key, agents }),
        });

        const data = await res.json();

        return new Response(JSON.stringify(data), { status: 200 });
    } catch(error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}