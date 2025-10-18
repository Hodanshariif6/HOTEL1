
import { useState, useEffect } from "react"
import { Upload, User, Mail } from "lucide-react"
// import Profile from "./profile"

function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  )
}

function Label({ children, className = "", ...props }) {
  return (
    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`} {...props}>
      {children}
    </label>
  )
}

function Card({ children, className = "" }) {
  return <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 ${className}`}>{children}</div>
}
function CardHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}
function CardTitle({ children, className = "" }) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
}
function CardDescription({ children, className = "" }) {
  return <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>{children}</p>
}
function CardContent({ children, className = "" }) {
  return <div className={`mt-4 ${className}`}>{children}</div>
}

function Avatar({ children, className = "" }) {
  return (
    <div className={`rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${className}`}>
      {children}
    </div>
  )
}
function AvatarImage({ src, alt }) {
  return <img src={src} alt={alt} className="w-full h-full object-cover" />
}
function AvatarFallback({ children, className = "" }) {
  return <div className={`w-full h-full flex items-center justify-center ${className}`}>{children}</div>
}

function useToast() {
  return {
    toast: ({ title, description, variant }) => {
      if (variant === "destructive") {
        alert(`${title} - ${description}`)
      } else {
        alert(`${title}\n${description}`)
      }
      console.log("Toast:", { title, description, variant })
    },
  }
}

export default function Setting() {
  const [profileImage, setProfileImage] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const savedName = localStorage.getItem("profileName")
    const savedEmail = localStorage.getItem("profileEmail")
    const savedImage = localStorage.getItem("profileImage")

    if (savedName) setName(savedName)
    if (savedEmail) setEmail(savedEmail)
    if (savedImage) setProfileImage(savedImage)
  }, [])

  useEffect(() => {
    if (name.trim()) localStorage.setItem("profileName", name)
    if (email.trim()) localStorage.setItem("profileEmail", email)
  }, [name, email])

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result)
        localStorage.setItem("profileImage", e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="flex">
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-md mx-auto pt-8">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Profile Admin</CardTitle>
              <CardDescription>Upload your photo and enter your details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt="Profile" />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg font-semibold">
                        {name ? getInitials(name) : <User className="w-8 h-8" />}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <label
                    htmlFor="image-upload"
                    className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                  </label>

                  <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>

                <p className="text-sm text-gray-500 text-center">Click the upload button to add your photo</p>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Gmail Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* <Profile name={name} email={email} profileImage={profileImage} /> */}
    </div>
  )
}
