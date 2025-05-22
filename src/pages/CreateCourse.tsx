
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ConfigContext } from "@/App";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a number",
  }),
  thumbnailUrl: z.string().url("Please enter a valid URL"),
  videoUrl: z.string().url("Please enter a valid URL"),
});

type SectionType = {
  id: string;
  title: string;
  content: string;
};

const CreateCourse = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { supabaseClient, supabaseConfigured } = useContext(ConfigContext);
  const [sections, setSections] = useState<SectionType[]>([
    { id: "1", title: "", content: "" },
  ]);
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "0",
      thumbnailUrl: "",
      videoUrl: "",
    },
  });

  const addSection = () => {
    setSections([
      ...sections,
      { id: Date.now().toString(), title: "", content: "" },
    ]);
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter((section) => section.id !== id));
    } else {
      toast({
        title: "Cannot Remove",
        description: "You must have at least one section",
        variant: "destructive",
      });
    }
  };

  const updateSection = (id: string, field: keyof SectionType, value: string) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Check if sections are filled
    const emptySections = sections.some(
      (section) => !section.title.trim() || !section.content.trim()
    );
    
    if (emptySections) {
      toast({
        title: "Incomplete Sections",
        description: "All sections must have a title and content",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    try {
      // Simulated upload for now - in a real app, would send to Supabase
      // Mock successful upload
      setTimeout(() => {
        const courseId = Date.now().toString();
        
        // Save to localStorage for now (in real app would be saved to database)
        const existingCourses = JSON.parse(localStorage.getItem("uploadedCourses") || "[]");
        const newCourse = {
          id: courseId,
          ...values,
          price: parseFloat(values.price),
          sections: sections,
          createdAt: new Date().toISOString(),
          authorId: "current-user-id", // In real app would be user.id from auth
        };
        
        existingCourses.push(newCourse);
        localStorage.setItem("uploadedCourses", JSON.stringify(existingCourses));
        
        setUploading(false);
        toast({
          title: "Course Created Successfully",
          description: "Your course has been uploaded and is now available",
        });
        
        navigate(`/uploaded-courses`);
      }, 1500);
    } catch (error) {
      setUploading(false);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your course",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-royal mb-2">Create New Course</h1>
          <p className="text-gray-600 mb-8">
            Share your numismatic knowledge with the community
          </p>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Introduction to Ancient Coins" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A comprehensive guide to identifying and valuing ancient coins..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (in ₹)</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="1999"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="thumbnailUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL (YouTube or direct link)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://youtube.com/watch?v=..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-6" />

                <div>
                  <h3 className="text-lg font-medium mb-4">Curriculum Sections</h3>
                  
                  <div className="space-y-4">
                    {sections.map((section, index) => (
                      <div
                        key={section.id}
                        className="border border-gray-200 rounded-md p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Section {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSection(section.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium block mb-1">
                              Section Title
                            </label>
                            <Input
                              value={section.title}
                              onChange={(e) =>
                                updateSection(section.id, "title", e.target.value)
                              }
                              placeholder="Introduction"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium block mb-1">
                              Section Content
                            </label>
                            <Textarea
                              value={section.content}
                              onChange={(e) =>
                                updateSection(section.id, "content", e.target.value)
                              }
                              placeholder="In this section, we will cover..."
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addSection}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Section
                    </Button>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    className="bg-royal hover:bg-blue-700 text-white"
                    disabled={uploading}
                  >
                    {uploading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {uploading ? "Uploading..." : "Create Course"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateCourse;
