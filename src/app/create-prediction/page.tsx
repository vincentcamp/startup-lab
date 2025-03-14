"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Plus, Calendar, Trophy, Award, Users, 
  Save, Eye, EyeOff, Clock, Check
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

const slideInFromRightVariants = {
  hidden: { x: 100, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
}

// Sample data
const popularPunishments = [
  { 
    title: "Hot Ones Challenge", 
    description: "Eat progressively spicier hot wings on camera",
    difficulty: "Hard"
  },
  { 
    title: "Bad Karaoke", 
    description: "Sing a song of the group's choice at a public karaoke night",
    difficulty: "Medium"
  },
  { 
    title: "Rival Jersey Day", 
    description: "Wear your most hated team's jersey all day in public",
    difficulty: "Easy"
  },
  { 
    title: "Ice Bucket Challenge", 
    description: "Film yourself getting drenched with a bucket of ice water",
    difficulty: "Medium"
  },
  { 
    title: "Social Media Takeover", 
    description: "Let your friends post whatever they want on your social media for 24 hours",
    difficulty: "Hard"
  }
]

const friendGroups = [
  { id: "1", name: "Fantasy Football Crew", members: 8 },
  { id: "2", name: "College Friends", members: 12 },
  { id: "3", name: "Work Buddies", members: 5 },
  { id: "4", name: "Basketball Team", members: 10 }
]

interface PredictionFormData {
    sportCategory: string;
    prediction: string;
    stake: string;
    punishment: string;
    deadline: string;
    shareWith: "public" | "friends" | "group";
}

export default function CreatePredictionPage() {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [selectedPunishment, setSelectedPunishment] = useState("")
  const [confidence, setConfidence] = useState([60])
  
  const [formData, setFormData] = useState<PredictionFormData>({
    sportCategory: "",
    prediction: "",
    stake: "25",
    punishment: "",
    deadline: "",
    shareWith: "public" as "public" | "friends" | "group"
  })

const handleInputChange = (field: keyof PredictionFormData, value: string): void => {
    setFormData({
        ...formData,
        [field]: value
    })
}

interface PunishmentOption {
    title: string;
    description: string;
}

const handlePunishmentSelect = (title: string, description: string): void => {
    setSelectedPunishment(title);
    handleInputChange("punishment", description);
};

  // Function to calculate the estimated odds from confidence
  const calculateOdds = () => {
    // Simple conversion from confidence percentage to odds
    const confValue = confidence[0]
    return `${(100 / confValue).toFixed(2)}x`
  }

const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    
    // Form validation
    if (!formData.sportCategory || !formData.prediction || !formData.stake || !formData.punishment) {
        alert("Please fill out all required fields")
        return
    }
    
    // Would normally submit to API here
    console.log("Submitting prediction:", formData)
    
    // Redirect to homepage after successful submission
    // In a real app, you'd use a loading state and handle API responses
    setTimeout(() => {
        window.location.href = "/"
    }, 1000)
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden framer-motion-cleanup">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="flex items-center gap-2">
                <motion.div 
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold"
                  whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  DB
                </motion.div>
                <span className="font-bold text-xl tracking-tight">DareBet</span>
              </Link>
            </motion.div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                {isPreviewMode ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Edit
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Preview
                  </>
                )}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit}
              >
                <Save className="h-4 w-4" />
                Create Prediction
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 framer-motion-cleanup">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="mb-8"
        >
          <motion.h1 
            className="text-3xl font-bold mb-2"
            variants={itemVariants}
          >
            Create a New Prediction
          </motion.h1>
          <motion.p 
            className="text-slate-600 mb-8"
            variants={itemVariants}
          >
            Make a sports prediction, set a stake amount, and choose a punishment if you're wrong
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial="hidden"
            animate="show"
            variants={containerVariants}
          >
            {isPreviewMode ? (
              <PredictionPreview 
                formData={formData}
                confidence={confidence[0]}
              />
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <motion.div className="bg-white rounded-lg border p-6" variants={itemVariants}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    Prediction Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="sportCategory" className="block text-sm font-medium mb-1">
                        Sport Category*
                      </label>
                      <Select 
                        value={formData.sportCategory} 
                        onValueChange={(value) => handleInputChange("sportCategory", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a sport" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NBA">NBA Basketball</SelectItem>
                          <SelectItem value="NFL">NFL Football</SelectItem>
                          <SelectItem value="MLB">MLB Baseball</SelectItem>
                          <SelectItem value="NHL">NHL Hockey</SelectItem>
                          <SelectItem value="Soccer">Soccer</SelectItem>
                          <SelectItem value="Golf">Golf</SelectItem>
                          <SelectItem value="UFC/MMA">UFC/MMA</SelectItem>
                          <SelectItem value="Tennis">Tennis</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="prediction" className="block text-sm font-medium mb-1">
                        Your Prediction*
                      </label>
                      <Textarea
                        id="prediction"
                        value={formData.prediction}
                        onChange={(e) => handleInputChange("prediction", e.target.value)}
                        placeholder="E.g., Lakers will beat the Bulls by 10+ points"
                        className="resize-none"
                        rows={3}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Be specific about what you're predicting to avoid any disputes later
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="stake" className="block text-sm font-medium mb-1">
                          Required Stake ($)*
                        </label>
                        <Input
                          id="stake"
                          type="number"
                          min="1"
                          value={formData.stake}
                          onChange={(e) => handleInputChange("stake", e.target.value)}
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Your Confidence ({confidence[0]}%)
                        </label>
                        <Slider
                          min={1}
                          max={99}
                          step={1}
                          value={confidence}
                          onValueChange={setConfidence}
                          className="mt-4"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Uncertain</span>
                          <span>Very Likely</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="deadline" className="block text-sm font-medium mb-1">
                        Betting Deadline*
                      </label>
                      <Input
                        id="deadline"
                        type="datetime-local"
                        value={formData.deadline}
                        onChange={(e) => handleInputChange("deadline", e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Set a deadline before the event starts
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div className="bg-white rounded-lg border p-6" variants={itemVariants}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-red-600" />
                    Punishment Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="punishment" className="block text-sm font-medium mb-1">
                        Punishment if Wrong*
                      </label>
                      <Textarea
                        id="punishment"
                        value={formData.punishment}
                        onChange={(e) => handleInputChange("punishment", e.target.value)}
                        placeholder="E.g., Eat a spoonful of hot sauce on video"
                        className="resize-none"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Popular Punishment Ideas
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {popularPunishments.map((punishment, index) => (
                          <div 
                            key={index}
                            className={`p-3 rounded-md border cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50 ${
                              selectedPunishment === punishment.title ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => handlePunishmentSelect(punishment.title, punishment.description)}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-medium text-sm">{punishment.title}</h4>
                              <span 
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  punishment.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                  punishment.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}
                              >
                                {punishment.difficulty}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">{punishment.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div className="bg-white rounded-lg border p-6" variants={itemVariants}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Sharing Options
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Share With
                      </label>
                      <Select 
                        value={formData.shareWith} 
                        onValueChange={(value) => handleInputChange("shareWith", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Anyone (Public)</SelectItem>
                          <SelectItem value="friends">All Friends</SelectItem>
                          <SelectItem value="group">Specific Group</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {formData.shareWith === 'group' && (
                      <div className="pt-2">
                        <label className="block text-sm font-medium mb-2">
                          Select Group
                        </label>
                        <div className="space-y-3">
                          {friendGroups.map(group => (
                            <div 
                              key={group.id}
                              className="flex items-center justify-between p-3 rounded-md border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                            >
                              <div>
                                <h4 className="font-medium text-sm">{group.name}</h4>
                                <p className="text-xs text-gray-600">{group.members} members</p>
                              </div>
                              <input 
                                type="radio" 
                                name="group" 
                                className="h-4 w-4 text-blue-600" 
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex justify-end gap-3 mt-6"
                  variants={itemVariants}
                >
                  <Button variant="outline" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Create Prediction
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>
          
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="show"
            variants={slideInFromRightVariants}
          >
            <Card className="border-2 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 10, 0] }}
                    transition={{ delay: 2, duration: 1, repeat: Infinity, repeatDelay: 7 }}
                  >
                    <Trophy className="h-5 w-5 text-blue-600" />
                  </motion.div>
                  Prediction Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <h4 className="font-medium text-sm mb-1">Be Specific</h4>
                    <p className="text-xs text-gray-600">
                      Clearly define what constitutes a win for your prediction to avoid disputes
                    </p>
                  </div>
                  <div className="border-b pb-3">
                    <h4 className="font-medium text-sm mb-1">Set Fair Stakes</h4>
                    <p className="text-xs text-gray-600">
                      Choose an amount that's fun but not financially burdensome for your friends
                    </p>
                  </div>
                  <div className="border-b pb-3">
                    <h4 className="font-medium text-sm mb-1">Creative Punishments</h4>
                    <p className="text-xs text-gray-600">
                      The best punishments are entertaining but not harmful or excessively embarrassing
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Set Clear Deadlines</h4>
                    <p className="text-xs text-gray-600">
                      Make sure the deadline is before the event starts to prevent last-minute betting
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ delay: 3, duration: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <Clock className="h-5 w-5 text-blue-600" />
                  </motion.div>
                  Prediction Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ol className="relative border-l border-gray-200 ml-3 space-y-6 pt-2">
                  <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                      <Check className="w-3 h-3 text-blue-800" />
                    </span>
                    <h3 className="font-medium text-sm">Create Prediction</h3>
                    <p className="text-xs text-gray-500">
                      Set your prediction, stake, and punishment
                    </p>
                  </li>
                  <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -left-3 ring-8 ring-white">
                      <span className="w-3 h-3 text-gray-500 text-xs">2</span>
                    </span>
                    <h3 className="font-medium text-sm">Friends Bet Against You</h3>
                    <p className="text-xs text-gray-500">
                      Friends contribute to the stake pool until deadline
                    </p>
                  </li>
                  <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -left-3 ring-8 ring-white">
                      <span className="w-3 h-3 text-gray-500 text-xs">3</span>
                    </span>
                    <h3 className="font-medium text-sm">Prediction Resolved</h3>
                    <p className="text-xs text-gray-500">
                      Event happens and prediction outcome is determined
                    </p>
                  </li>
                  <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -left-3 ring-8 ring-white">
                      <span className="w-3 h-3 text-gray-500 text-xs">4</span>
                    </span>
                    <h3 className="font-medium text-sm">Winner Determined</h3>
                    <p className="text-xs text-gray-500">
                      You either win the stake pool or perform the punishment
                    </p>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

// Preview component for the prediction
function PredictionPreview({ formData, confidence }: { formData: PredictionFormData, confidence: number }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeInVariants}
      className="bg-white rounded-lg border-2 border-blue-200 overflow-hidden"
    >
      <div className="bg-blue-50 p-4 border-b border-blue-200">
        <h2 className="text-xl font-bold text-blue-900">Preview Your Prediction</h2>
        <p className="text-sm text-blue-700">This is how your prediction will appear to others</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">You</p>
              <p className="text-xs text-gray-500">Just now</p>
            </div>
          </div>
          
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {formData.sportCategory || "Sport Category"}
          </span>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                Prediction
              </div>
              <p className="font-medium flex-1">
                {formData.prediction || "Your prediction will appear here"}
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                Punishment
              </div>
              <p className="text-sm flex-1">
                {formData.punishment || "Your punishment will appear here"}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between bg-gray-50 p-3 rounded-md">
            <div className="text-center">
              <div className="text-sm font-medium">${formData.stake || "0"}</div>
              <div className="text-xs text-gray-500">Total Stake</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{confidence}%</div>
              <div className="text-xs text-gray-500">Implied Odds</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">
                {(100 / confidence).toFixed(2)}x
              </div>
              <div className="text-xs text-gray-500">Potential Payout</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Stake progress: $0 of ${formData.stake || "0"}</span>
              <span className="font-medium">0%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full w-0" />
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>
                {formData.deadline 
                  ? new Date(formData.deadline).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    }) 
                  : "Deadline not set"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span>
                {formData.shareWith === 'public' ? 'Public' : 
                 formData.shareWith === 'friends' ? 'All Friends' : 
                 'Specific Group'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t">
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Join Bet (${formData.stake || "0"} left)
        </Button>
      </div>
    </motion.div>
  )
}