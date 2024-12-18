'use client';

import { useState, ChangeEvent } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

interface BannerProps {
  id: string;
  image?: string;
  onEdit: (id: string, data: { image?: string }) => void;
  onDelete: (id: string) => void;
  onImageUpload?: (file: File) => void;
}

const BannerSection: React.FC<BannerProps> = ({ id, image, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [newImage, setNewImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onEdit(id, { image: newImage ?? undefined });  // Converts null to undefined
    setOpen(false);
  };
  

  return (
    <TableRow>
      <TableCell>
        {image && (
          <img src={image} alt="Banner" className="w-32 h-16 object-cover rounded" />
        )}
      </TableCell>
      <TableCell>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Banner</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {newImage && (
                  <img
                    src={newImage}
                    alt="New Banner"
                    className="mt-2 w-32 h-16 object-cover rounded"
                  />
                )}
              </div>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};

interface CardProps {
  id: string;
  title: string;
  content: string;
  image?: string;
  onEdit: (id: string, data: { title: string; content: string; image?: string }) => void;
  onDelete: (id: string) => void;
}

const CardSection: React.FC<CardProps> = ({
  id,
  title,
  content,
  image,
  onEdit,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [newImage, setNewImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onEdit(id, {
      title: editedTitle,
      content: editedContent,
      image: newImage || image,
    });
    setOpen(false);
  };

  return (
    <TableRow>
      <TableCell>{title}</TableCell>
      <TableCell>{content}</TableCell>
      <TableCell>
        {image && (
          <img src={image} alt={title} className="w-16 h-16 object-cover rounded" />
        )}
      </TableCell>
      <TableCell>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {(newImage || image) && (
                  <img
                    src={newImage || image}
                    alt={title}
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};

interface AboutUsProps {
  id: string;
  title: string;
  content: string;
  onEdit: (id: string, data: { title: string; content: string }) => void;
  onDelete: (id: string) => void;
}

const AboutUsSection: React.FC<AboutUsProps> = ({ id, title, content, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onEdit(id, { title: editedTitle, content: editedContent });
    setOpen(false);
  };

  return (
    <TableRow>
      <TableCell>{title}</TableCell>
      <TableCell>{content}</TableCell>
      <TableCell>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit About Us</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </div>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};

interface PageSectionsProps {
  activePage: 'Banner' | 'Card' | 'About Us';
  sections: Array<BannerProps | CardProps | AboutUsProps>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onImageUpload?: (file: File) => void;
}

export const PageSections: React.FC<PageSectionsProps> = ({
  activePage,
  sections,
  onEdit,
  onDelete,
  onImageUpload,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {activePage === 'Banner' && (
            <>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </>
          )}
          {activePage === 'Card' && (
            <>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </>
          )}
          {activePage === 'About Us' && (
            <>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Actions</TableHead>
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sections.map((section) => {
          if (activePage === 'Banner' && 'image' in section) {
            return (
              <BannerSection
                key={section.id}
                {...section}
                onEdit={onEdit}
                onDelete={onDelete}
                onImageUpload={onImageUpload}
              />
            );
          } else if (activePage === 'Card' && 'title' in section && 'content' in section) {
            return (
              <CardSection
                key={section.id}
                {...section}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          } else if (activePage === 'About Us' && 'title' in section) {
            return (
              <AboutUsSection
                key={section.id}
                {...section}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          }
          return null;
        })}
      </TableBody>
    </Table>
  );
};
