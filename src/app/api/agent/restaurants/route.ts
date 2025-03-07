const API_BASE_URL = process.env;

export async function POST(req: Request) {
    try
    {
        const { location, restaurant } = await req.json();
        const apiKey = "AIzaSyB9uo05E6pcZ3TfjEwF2oEaeFj9oCvbXO0"; 
        const query = `${location} ${restaurant}`; // 검색할 지역과 키워드정보 (예: 삼겹살, 파스타 등)
        const url = `https://places.googleapis.com/v1/places:searchText`;
        
        const res = await fetch(url, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.location,places.googleMapsUri"
            },
            body: JSON.stringify({ textQuery: query }),
        });

        const data = await res.json();

        return new Response(JSON.stringify(data), { status: 200 });   
    } catch(error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}