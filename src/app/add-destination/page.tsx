"use client";

import { useState, type FormEvent } from "react";
import { CirclePlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = ["Beach", "Mountain", "City", "Cultural", "Adventure"];

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ?? `${process.env.SERVER_URL}`;

const EMPTY_FORM = {
    destinationName: "",
    country: "",
    category: "Beach",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
};

const AddDestinationPage = () => {
    const [form, setForm] = useState(EMPTY_FORM);
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setField = (field: keyof typeof EMPTY_FORM, value: string) => {
        setForm((previous) => ({ ...previous, [field]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus("");

    const token = await getTokenFromClient()
        try {
            const res = await fetch(`${API_BASE_URL}/add-destination`, {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    authorization:`Berear ${token}`
                 },
                body: JSON.stringify({ ...form, price: Number(form.price) }),
            });

            if (!res.ok) {
                let message = `The server responded with status ${res.status}.`;
                try {
                    const body = (await res.json()) as { error?: string };
                    if (typeof body.error === "string" && body.error) {
                        message = body.error;
                    }
                } catch {
                    // Server did not return a JSON error body.
                }
                throw new Error(message);
            }

            setForm(EMPTY_FORM);
            setStatus("Travel package added successfully!");
        } catch (error) {
            if (error instanceof TypeError) {
                // fetch() rejects with TypeError when the server is unreachable.
                setStatus(
                    `Can't reach the server at ${API_BASE_URL}. Make sure the backend is running, then try again.`,
                );
            } else if (error instanceof Error) {
                setStatus(error.message);
            } else {
                setStatus("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setForm(EMPTY_FORM);
        setStatus("");
    };

    return (
        <main className="px-6 pb-16 pt-10 sm:px-10">
            <h1 className="text-3xl font-normal sm:text-4xl">Add New Travel Package</h1>

            <Card className="mx-auto mt-10 w-full max-w-lg">
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <Label htmlFor="destination-name">Destination Name</Label>
                            <Input
                                id="destination-name"
                                placeholder="Bali Paradise"
                                required
                                value={form.destinationName}
                                onChange={(event) => setField("destinationName", event.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    placeholder="Indonesia"
                                    required
                                    value={form.country}
                                    onChange={(event) => setField("country", event.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={form.category}
                                    onValueChange={(value) => setField("category", value ?? "Beach")}
                                >
                                    <SelectTrigger id="category" className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="price">Price (USD)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="1"
                                    placeholder="e.g., 1299"
                                    required
                                    value={form.price}
                                    onChange={(event) => setField("price", event.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    placeholder="e.g., 7 Days/6 Nights"
                                    required
                                    value={form.duration}
                                    onChange={(event) => setField("duration", event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="departure-date">Departure Date</Label>
                            <Input
                                id="departure-date"
                                type="date"
                                required
                                value={form.departureDate}
                                onChange={(event) => setField("departureDate", event.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="image-url">Image URL</Label>
                            <Input
                                id="image-url"
                                type="url"
                                placeholder="https://images.unsplash.com/photo-..."
                                value={form.imageUrl}
                                onChange={(event) => setField("imageUrl", event.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                className="min-h-24"
                                placeholder="Describe the travel experience..."
                                required
                                value={form.description}
                                onChange={(event) => setField("description", event.target.value)}
                            />
                        </div>

                        {status ? (
                            <p
                                className={
                                    status.includes("success")
                                        ? "text-xs text-cyan-700"
                                        : "text-xs text-destructive"
                                }
                                role="status"
                            >
                                {status}
                            </p>
                        ) : null}

                        <div className="flex justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="text-destructive hover:bg-red-50 hover:text-destructive"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                            >
                                <Trash2Icon />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-cyan-500 text-white hover:bg-cyan-600"
                                disabled={isSubmitting}
                            >
                                <CirclePlusIcon />
                                {isSubmitting ? "Adding..." : "Add Travel Package"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
};

export default AddDestinationPage;
