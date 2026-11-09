"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";

import { useState, type FormEvent } from "react";
import { CirclePlusIcon, Trash2Icon } from "lucide-react";


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
import { Button } from "./ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { Destination } from "@/lib/types";
const CATEGORIES = ["Beach", "Mountain", "City", "Cultural", "Adventure"];

type FormFields = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const EditDestinationsDialog = ({ destination }: { destination: Destination }) => {
  // console.log(destination, 'from editPage')
  const [form, setForm] = useState(destination);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (field: keyof FormFields, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { _id, ...updatedData } = form;
    const destinationId = _id ?? destination._id;

    setIsSubmitting(true);
    setStatus("");
    try {
      const token = await getTokenFromClient();
      const res = await fetch(
        `${process.env.SERVER_URL}/destination/${destinationId}`,
        {
          method: "PATCH",
          
          headers: {
            "Content-Type": "application/json",
            authorization: `Berear ${token}`,
          },
          body: JSON.stringify(updatedData),
        },
      );
      if (!res.ok) {
        throw new Error(`The server responded with status ${res.status}.`);
      }
      setStatus("Travel package edited successfully!");
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm(destination);
    setStatus("");
  };

  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <Button variant="outline">
          <Pencil data-icon="inline-start" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Destination?</DialogTitle>
          <DialogDescription>
            Update the travel package details below.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <Label htmlFor="destination-name">Destination Name</Label>
                <Input
                  id="destination-name"
                  placeholder="Bali Paradise"
                  required
                  value={form.destinationName}
                  onChange={(event) =>
                    setField("destinationName", event.target.value)
                  }
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
                    onChange={(event) =>
                      setField("country", event.target.value)
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) =>
                      setField("category", value ?? "Beach")
                    }
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
                    onChange={(event) =>
                      setField("duration", event.target.value)
                    }
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
                  onChange={(event) =>
                    setField("departureDate", event.target.value)
                  }
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
                  onChange={(event) =>
                    setField("description", event.target.value)
                  }
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
                  {isSubmitting ? "Editting..." : "Edit Travel Package"}
                </Button>
              </div>
            </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationsDialog;
