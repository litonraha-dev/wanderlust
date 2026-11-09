import { NextResponse } from "next/server";

const REQUIRED_FIELDS = [
    "destinationName",
    "country",
    "category",
    "duration",
    "departureDate",
    "description",
] as const;

function readString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { ok: false, error: "Request body must be valid JSON." },
            { status: 400 },
        );
    }

    if (body === null || typeof body !== "object" || Array.isArray(body)) {
        return NextResponse.json(
            { ok: false, error: "Request body must be a JSON object." },
            { status: 400 },
        );
    }

    const input = body as Record<string, unknown>;
    const price = Number(input.price);
    const missingFields = REQUIRED_FIELDS.filter(
        (field) => readString(input[field]) === "",
    );

    if (missingFields.length > 0) {
        return NextResponse.json(
            {
                ok: false,
                error: `Missing required fields: ${missingFields.join(", ")}.`,
            },
            { status: 400 },
        );
    }

    if (!Number.isFinite(price) || price <= 0) {
        return NextResponse.json(
            { ok: false, error: "Price must be a positive number." },
            { status: 400 },
        );
    }

    // TODO: persist to a database/data store once a destinations listing exists.
    const destination = {
        destinationName: readString(input.destinationName),
        country: readString(input.country),
        category: readString(input.category),
        price,
        duration: readString(input.duration),
        departureDate: readString(input.departureDate),
        imageUrl: readString(input.imageUrl),
        description: readString(input.description),
    };

    return NextResponse.json({ ok: true, destination }, { status: 201 });
}

export async function GET() {
    return NextResponse.json(
        { ok: false, error: "Not yet implemented." },
        { status: 501 },
    );
}
