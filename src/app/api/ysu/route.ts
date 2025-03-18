const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: Request) {
    try
    {
        const { question, language } = await req.json();
        const res = await fetch(`${API_BASE_URL}/v1/chatbot/ysu`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, language }),
        });

        const data = await res.json();

        return new Response(JSON.stringify(data), { status: 200 });   
    } catch(error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}