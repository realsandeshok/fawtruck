import { useState } from "react"
import { cn } from "../../../lib/utils"
import { Button } from "../../ui/button"
import { Card, CardContent } from "../../ui/card"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import toast from "react-hot-toast" // Import toast
import { AdminLogin } from "../../../api/api"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const userData = { username, password };
  
    try {
      const response = await fetch(AdminLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    
      console.log("Response Status:", response.status);
    
      if (!response.ok) {
        throw new Error("Invalid username or password.");
      }
    
      const data = await response.json();
      console.log("Response Data:", data);
    
      // Ensure token exists
      if (!data.token) {
        throw new Error("Missing token in response.");
      }
    
      localStorage.setItem("token", data.token);
    
      // Show success toast
      toast.success("Login successful!", { duration: 3000 });
    
      // Delay redirection to allow toast to display
      setTimeout(() => {
        window.location.href = "/banner";
      }, 1000); // 1-second delay
    }
    catch (err: unknown) {
      let errorMessage = "An unexpected error occurred.";
  
      // Handle specific error scenarios
      if (err instanceof Error) {
        errorMessage = err.message;
      }
  
      // Show error toast
      toast.error(errorMessage, {
        duration: 3000,
      });
  
      // Optionally set the error message for UI display
      setErrorMessage(errorMessage);
    }
  };
  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your FawTruck account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && (
                <div className="text-red-500 text-center">{errorMessage}</div>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
