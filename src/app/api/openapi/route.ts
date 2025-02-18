const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: Request) {
    try
    {
        const { question, llmModel, key } = await req.json();
        const res = await fetch(`${API_BASE_URL}/v1/chatbot/lenovo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, llmModel, key }),
        });

        const data = await res.json();

        //return Response.json(data);
        return new Response(JSON.stringify(data), { status: 200 });   
    } catch(error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}