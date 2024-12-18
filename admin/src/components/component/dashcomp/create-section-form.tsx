'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import { Label } from "../../ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"

// Define the types for props
interface CreateSectionFormProps {
  activePage: string;
  onCreateSection: (section: { title: string; content: string; image: string | null }) => void;
}

export function CreateSectionForm({ activePage, onCreateSection }: CreateSectionFormProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateSection({ title, content, image });
    // Reset form
    setTitle('');
    setContent('');
    setImage(null);
    setOpen(false);
  };

  // Handle image input change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New {activePage}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New {activePage}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {activePage !== 'Banner' && (
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Enter ${activePage} title`}
                required
              />
            </div>
          )}
          {activePage !== 'Banner' && (
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Enter ${activePage} content`}
                required
              />
            </div>
          )}
          {activePage !== 'About Us' && (
            <div>
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={activePage === 'Banner'}
              />
              {image && (
                <img src={image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
              )}
            </div>
          )}
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
