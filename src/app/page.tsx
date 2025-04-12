"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Banknote,
  Trophy,
  Bell,
  ChevronDown,
  Plus,
  Zap,
  Search,
  User,
  Users,
  TrendingUp,
  Award,
  Share2,
  MessageSquare,
  Calendar,
  Clock,
  Heart,
  Flame,
  LucideIcon,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
}

const staggerListVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
}

const floatVariants = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
}

// New animation variants for wheel
const spinVariants = {
  initial: { rotate: 0 },
  spinning: (endDegree: number) => ({ 
    rotate: endDegree,
    transition: { 
      duration: 5,
      ease: [0.1, 0.9, 0.2, 1.0], // More dramatic easing
      type: "spring",
      stiffness: 20,
      damping: 15
    }
  })
}

// New animation variants for celebration effect
const celebrationVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: [0, 1, 0], 
    scale: [0, 1.5, 0],
    transition: { 
      duration: 1.5,
      times: [0, 0.5, 1]
    }
  }
}

// Example punishments for the wheel
const wheelPunishments = [
  { text: "Hot Ones Challenge", color: "#EF4444" }, // red
  { text: "Bad Karaoke Night", color: "#3B82F6" }, // blue
  { text: "Friends pick outfit for a day", color: "#F59E0B" }, // amber
  { text: "Ice Bucket Challenge", color: "#10B981" }, // emerald
  { text: "Social Media Takeover", color: "#8B5CF6" }, // violet
  { text: "Personal Chef for a Day", color: "#EC4899" }, // pink
  { text: "Run in Silly Costume", color: "#0EA5E9" }, // sky
  { text: "Dye Hair Team Colors", color: "#F97316" } // orange
]

// Our three tier punishments for testing (tier 1=mild, tier 2=medium, tier 3=difficult)
const tierPunishments = [
  { text: "Friends pick outfit for a day", color: "#F59E0B" }, // Tier 1 - mild
  { text: "Hot Ones Challenge", color: "#EF4444" }, // Tier 2 - medium
  { text: "Dye Hair Team Colors", color: "#F97316" } // Tier 3 - difficult
]

// Example data
const bets = [
  {
    id: "1",
    user: {
      name: "Marcus Han",
      avatar: "/avatars/alex.png",
      initials: "MH",
    },
    prediction: "Lakers will beat the Nets by at least 10 points on Sunday",
    punishment: "Eat a raw onion like an apple on Instagram Live",
    stake: 20,
    deadline: "Sunday, 7:30 PM",
    impliedOdds: 65,
    sportCategory: "NBA",
    contributors: [
      { name: "Jordan", initials: "JK", amount: 5 },
      { name: "Mike", initials: "MS", amount: 10 },
    ],
    totalRaised: 15,
    progress: 75,
    comments: 8,
    reactions: 12,
  },
  {
    id: "2",
    user: {
      name: "Jamie Valdes",
      avatar: "/avatars/jamie.png",
      initials: "JV",
    },
    prediction:
      "Chiefs will score at least 3 touchdowns against the Raiders",
    punishment: "Wear rival team jersey to work for a full day",
    stake: 30,
    deadline: "Monday, 8:00 PM",
    impliedOdds: 75,
    sportCategory: "NFL",
    contributors: [
      { name: "Chris", initials: "CD", amount: 10 },
      { name: "Taylor", initials: "TR", amount: 5 },
      { name: "Pat", initials: "PB", amount: 10 },
    ],
    totalRaised: 25,
    progress: 83,
    comments: 14,
    reactions: 23,
  },
  {
    id: "3",
    user: {
      name: "Nicole Wu",
      avatar: "/avatars/dana.png",
      initials: "NW",
    },
    prediction: "Tiger Woods will finish in the top 10 at the Masters",
    punishment: "Shave head completely bald on livestream",
    stake: 50,
    deadline: "Sunday, 6:00 PM",
    impliedOdds: 35,
    sportCategory: "Golf",
    contributors: [
      { name: "Shannon", initials: "SL", amount: 15 },
      { name: "Terry", initials: "TM", amount: 10 },
    ],
    totalRaised: 25,
    progress: 50,
    comments: 6,
    reactions: 18,
  },
]

const friendActivity = [
  {
    name: "Jordan Kim",
    initials: "JK",
    action: "placed $25 on Alex's Lakers prediction",
    time: "35m ago",
  },
  {
    name: "Taylor Reed",
    initials: "TR",
    action: "won $45 from their Chiefs prediction",
    time: "2h ago",
  },
  {
    name: "Pat Brown",
    initials: "PB",
    action: "completed punishment: ate a ghost pepper on live",
    time: "yesterday",
  },
]

const upcomingEvents = [
  { name: "Super Bowl", date: "Feb 9", betCount: 124 },
  { name: "NBA All-Star Game", date: "Feb 16", betCount: 87 },
  { name: "UFC 294", date: "Mar 5", betCount: 56 },
]

const popularGroups = [
  { name: "Fantasy Football Fanatics", members: 78, betsThisWeek: 34 },
  { name: "March Madness Squad", members: 42, betsThisWeek: 28 },
  { name: "NBA Prediction Pros", members: 63, betsThisWeek: 47 },
]

// MAIN PAGE COMPONENT
export default function HomePage() {
  const [isCreatingBet, setIsCreatingBet] = useState(false)
  const [selectedTab, setSelectedTab] = useState("friends")
  const [isWheelSpun, setIsWheelSpun] = useState(false)
  const [isWheelSpinning, setIsWheelSpinning] = useState(false)
  const [selectedPunishment, setSelectedPunishment] = useState("")
  const [wheelEndRotation, setWheelEndRotation] = useState(0)
  const [predictionCount, setPredictionCount] = useState(0)
  const [predictionText, setPredictionText] = useState("")
  const [selectedSport, setSelectedSport] = useState("nba")
  const [minimumStake, setMinimumStake] = useState("")
  const [deadline, setDeadline] = useState("")
  const [shareWith, setShareWith] = useState("public")
  const [betsData, setBetsData] = useState(bets)
  
  // Function to spin the wheel and select a punishment
  const spinWheel = () => {
    if (isWheelSpun || isWheelSpinning) return;
    
    setIsWheelSpinning(true);
    
    // Play spinning sound effect
    try {
      const audio = new Audio('/wheel-spin.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play error:', e));
    } catch (error) {
      console.log('Audio not supported:', error);
    }
    
    // Select punishment based on prediction count (sequential)
    // 0 = first time (Friends pick outfit), 1 = second time (Hot Ones), 2+ = third time (Dye Hair)
    const index = Math.min(predictionCount, 2);
    const selectedPunishmentObj = tierPunishments[index];
    
    // Calculate wheel rotation to land on the selected punishment
    // First, find the index of the selected punishment in the wheelPunishments array
    let punishmentIndex = 0;
    for (let i = 0; i < wheelPunishments.length; i++) {
      if (wheelPunishments[i].text === selectedPunishmentObj.text) {
        punishmentIndex = i;
        break;
      }
    }
    
    // Each segment is 45 degrees (360 / 8 punishments)
    // Calculate endpoint to center of the selected segment + add multiple full rotations
    const baseRotation = (punishmentIndex * 45) + 22.5; // Center of the segment
    const endRotation = 1800 - baseRotation; // Subtract from 1800 (5 full rotations) to land on the correct segment
    
    // Set the target rotation
    setWheelEndRotation(endRotation);
    
    setTimeout(() => {
      setSelectedPunishment(selectedPunishmentObj.text);
      setIsWheelSpun(true);
      setIsWheelSpinning(false);
      
      // Play success sound when wheel stops
      try {
        const successAudio = new Audio('/wheel-stop.mp3');
        successAudio.volume = 0.7;
        successAudio.play().catch(e => console.log('Audio play error:', e));
      } catch (error) {
        console.log('Audio not supported:', error);
      }
    }, 5000); // 5 seconds spin time
  }
  
  // Reset wheel state when dialog is closed
  const handleDialogChange = (open: boolean) => {
    setIsCreatingBet(open);
    if (!open) {
      setIsWheelSpun(false);
      setIsWheelSpinning(false);
      setSelectedPunishment("");
      setPredictionText("");
      setMinimumStake("");
      setDeadline("");
    }
  }
  
  // Function to handle prediction submission
  const handleCreatePrediction = () => {
    // Create a new prediction
    const newPrediction = {
      id: `${betsData.length + 1}`,
      user: {
        name: "You", // Using "You" as the name since this is the current user
        avatar: "/avatars/user.png",
        initials: "YO",
      },
      prediction: predictionText,
      punishment: selectedPunishment,
      stake: parseInt(minimumStake) || 25, // Default to 25 if not specified
      deadline: deadline || "Tomorrow, 8:00 PM", // Default deadline if not specified
      impliedOdds: Math.floor(Math.random() * 30) + 50, // Random odds between 50-80%
      sportCategory: selectedSport.toUpperCase(),
      contributors: [],
      totalRaised: 0,
      progress: 0,
      comments: 0,
      reactions: 0,
    };
    
    // Add to beginning of bets array
    setBetsData([newPrediction, ...betsData]);
    
    // Close dialog and increment prediction count
    handleDialogChange(false);
    setPredictionCount(predictionCount + 1);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* HEADER */}
      <motion.header
        className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold"
              whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              BOD
            </motion.div>
            <span className="font-bold text-xl tracking-tight">BetOrDare</span>
          </motion.div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {["Explore", "My Bets", "Friend Groups", "Leaderboard"].map(
              (item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.1, color: "#2563EB" }}
                >
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm font-medium transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              )
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 15 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button size="sm" variant="ghost" className="rounded-full" asChild>
                <Link href="/search">
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full relative"
                asChild
              >
                <Link href="/notifications">
                  <Bell className="h-5 w-5" />
                  <motion.span
                    className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  ></motion.span>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Avatar className="h-9 w-9 cursor-pointer border-2 border-transparent hover:border-blue-600 transition-all">
                <AvatarImage src="/avatars/user.png" alt="User" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {/* Hero / Intro section */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <div className="flex flex-col gap-4 text-center mb-12 max-w-3xl mx-auto">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  duration: 0.7,
                },
              }}
            >
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{ rotate: [0, -3, 3, 0] }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                Bet
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                Smarter,
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{ rotate: [0, -2, 2, 0] }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="text-blue-600"
              >
                Laugh
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="text-blue-600"
              >
                Harder
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl text-slate-600 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Make sports predictions with your friends, win their money, or
              face hilarious punishments — all while strengthening your
              friendship bonds
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-6"
              variants={itemVariants}
            >
              <Dialog open={isCreatingBet} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      size="lg"
                      className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-md hover:shadow-lg"
                    >
                      <motion.div
                        animate={{ rotate: [0, 180] }}
                        transition={{ duration: 0.5, delay: 2 }}
                        className="mr-2"
                      >
                        <Plus className="h-5 w-5" />
                      </motion.div>
                      Create a Prediction
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <AnimatePresence>
                  {isCreatingBet && (
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DialogHeader>
                          <DialogTitle>Create a New Prediction</DialogTitle>
                          <DialogDescription>
                            Set your prediction, spin the wheel for a punishment, and set your stake.
                          </DialogDescription>
                        </DialogHeader>
                        <motion.div
                          className="grid gap-4 py-4"
                          variants={staggerListVariants}
                          initial="hidden"
                          animate="show"
                        >
                          <motion.div
                            className="space-y-2"
                            variants={itemVariants}
                          >
                            <label
                              htmlFor="sport"
                              className="text-sm font-medium"
                            >
                              Sport Category
                            </label>
                            <select
                              id="sport"
                              className="w-full border border-gray-300 rounded-md p-2 text-sm"
                              value={selectedSport}
                              onChange={(e) => setSelectedSport(e.target.value)}
                            >
                              <option value="nba">NBA Basketball</option>
                              <option value="nfl">NFL Football</option>
                              <option value="mlb">MLB Baseball</option>
                              <option value="nhl">NHL Hockey</option>
                              <option value="soccer">Soccer</option>
                              <option value="other">Other</option>
                            </select>
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            variants={itemVariants}
                          >
                            <label
                              htmlFor="prediction"
                              className="text-sm font-medium"
                            >
                              Your Prediction
                            </label>
                            <Input
                              id="prediction"
                              placeholder="Lakers will beat the Bulls by 10+ points"
                              value={predictionText}
                              onChange={(e) => setPredictionText(e.target.value)}
                            />
                          </motion.div>
                          
                          {/* Wheel of Punishments */}
                          <motion.div
                            className="space-y-2 my-4"
                            variants={itemVariants}
                          >
                            <div className="text-center">
                              <h3 className="text-lg font-semibold text-blue-600 mb-2">Wheel of Punishments</h3>
                              <p className="text-sm text-gray-600 mb-4">
                                Spin the wheel to select your punishment if your prediction is wrong
                              </p>
                              
                              <div className="relative flex justify-center items-center mx-auto w-60 h-60 mb-6">
                                {/* Celebration Effects - shown when wheel stops */}
                                {isWheelSpun && (
                                  <>
                                    {Array.from({ length: 12 }).map((_, i) => {
                                      const angle = (i * 30) * (Math.PI / 180);
                                      const distance = 95;
                                      const x = Math.cos(angle) * distance;
                                      const y = Math.sin(angle) * distance;
                                      
                                      return (
                                        <motion.div
                                          key={i}
                                          className="absolute rounded-full w-3 h-3 z-20"
                                          style={{ 
                                            left: 'calc(50% + ' + x + 'px)',
                                            top: 'calc(50% + ' + y + 'px)',
                                            backgroundColor: i % 3 === 0 ? '#EF4444' : i % 3 === 1 ? '#3B82F6' : '#F59E0B' 
                                          }}
                                          variants={celebrationVariants}
                                          initial="hidden"
                                          animate="visible"
                                          transition={{
                                            delay: i * 0.08,
                                            repeat: 2,
                                            repeatDelay: 0.3
                                          }}
                                        />
                                      );
                                    })}
                                    
                                    {/* Highlight ring around selected segment */}
                                    <motion.div
                                      className="absolute inset-0 rounded-full"
                                      initial={{ opacity: 0, scale: 1.1 }}
                                      animate={{ 
                                        opacity: [0, 0.6, 0],
                                        scale: [1.1, 1.15, 1.1]
                                      }}
                                      transition={{ 
                                        duration: 2,
                                        repeat: 3,
                                        repeatDelay: 0.5
                                      }}
                                      style={{ 
                                        background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, rgba(255,255,255,0) 70%)'
                                      }}
                                    />
                                  </>
                                )}
                                
                                {/* Wheel Marker/Pointer */}
                                <motion.div 
                                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                                  animate={{ y: isWheelSpinning ? [-3, -8, -3] : -3 }}
                                  transition={{ repeat: Infinity, duration: 0.3 }}
                                >
                                  <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-red-600 drop-shadow-md"></div>
                                </motion.div>
                                
                                {/* Wheel Background (stationary) */}
                                <div className="absolute inset-0 rounded-full bg-gray-200 shadow-inner"></div>
                                
                                {/* Spinning Wheel */}
                                <motion.div
                                  className="relative w-48 h-48 rounded-full overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                                  variants={spinVariants}
                                  initial="initial"
                                  animate={isWheelSpinning ? "spinning" : "initial"}
                                  custom={wheelEndRotation}
                                  style={{
                                    background: 'conic-gradient(from 0deg, #EF4444 0deg, #3B82F6 45deg, #F59E0B 90deg, #10B981 135deg, #8B5CF6 180deg, #EC4899 225deg, #0EA5E9 270deg, #F97316 315deg, #EF4444 360deg)',
                                  }}
                                >
                                  {/* Wheel divider lines */}
                                  {wheelPunishments.map((_, index) => {
                                    const angle = index * 45;
                                    return (
                                      <div 
                                        key={`line-${index}`}
                                        className="absolute top-0 left-0 w-full h-full"
                                        style={{ 
                                          transform: `rotate(${angle}deg)`,
                                          transformOrigin: 'center'
                                        }}
                                      >
                                        <div className="absolute top-1/2 left-0 w-1/2 h-[2px] bg-white"></div>
                                      </div>
                                    );
                                  })}
                                  
                                  {/* Wheel labels */}
                                  <div className="absolute inset-0">
                                    {wheelPunishments.map((punishment, index) => {
                                      // Calculate position for each label in the wheel
                                      const angle = (index * 45) + 22.5; // Center of segment
                                      const radian = (angle - 90) * Math.PI / 180;
                                      const radius = 28; // % from center - reduced to avoid overlap
                                      
                                      // Calculate x,y position using trigonometry
                                      const x = 50 + radius * Math.cos(radian);
                                      const y = 50 + radius * Math.sin(radian);
                                      
                                      return (
                                        <div 
                                          key={`label-${index}`}
                                          className="absolute px-1 py-0.5 rounded"
                                          style={{
                                            top: `${y}%`,
                                            left: `${x}%`,
                                            transform: 'translate(-50%, -50%) rotate(' + angle + 'deg)',
                                            fontSize: '6px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            background: punishment.color,
                                            border: '0.5px solid rgba(255,255,255,0.7)',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
                                            maxWidth: '36px',
                                            textAlign: 'center',
                                            zIndex: 5,
                                            opacity: 0.95
                                          }}
                                        >
                                          {punishment.text}
                                        </div>
                                      );
                                    })}
                                  </div>
                                  
                                  {/* Wheel Border */}
                                  <div className="absolute inset-0 rounded-full border-[3px] border-white/30"></div>
                                </motion.div>
                                
                                {/* Center Circle */}
                                <div className="absolute left-1/2 top-1/2 w-14 h-14 -ml-7 -mt-7 rounded-full bg-white flex justify-center items-center shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
                                  <motion.div
                                    whileHover={!isWheelSpun && !isWheelSpinning ? { scale: 1.1, boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' } : {}}
                                    whileTap={!isWheelSpun && !isWheelSpinning ? { scale: 0.95 } : {}}
                                    animate={!isWheelSpun && !isWheelSpinning ? { scale: [1, 1.05, 1] } : {}}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className={`rounded-full p-2 ${isWheelSpun ? 'bg-gray-300 cursor-not-allowed' : isWheelSpinning ? 'bg-gray-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-md'}`}
                                    onClick={spinWheel}
                                  >
                                    {isWheelSpun ? (
                                      <Check className="h-4 w-4 text-white" />
                                    ) : (
                                      <div className="text-white text-xs font-bold">SPIN</div>
                                    )}
                                  </motion.div>
                                </div>
                                
                                {/* Visual Effects for Spinning State */}
                                {isWheelSpinning && (
                                  <motion.div 
                                    className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm"
                                    animate={{ opacity: [0, 0.2, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.5 }}
                                  />
                                )}
                              </div>
                              
                              {/* Selected Punishment Display */}
                              {selectedPunishment ? (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0, scale: [1, 1.1, 1] }}
                                  transition={{ duration: 0.5 }}
                                  className="text-center p-4 bg-red-50 border-2 border-red-200 rounded-lg shadow-md max-w-md mx-auto"
                                >
                                  <p className="text-sm font-semibold text-red-600 mb-1">Your Punishment If Wrong:</p>
                                  <p className="text-lg font-bold text-red-700">{selectedPunishment}</p>
                                  <p className="text-xs text-gray-600 mt-2">Are you ready to accept this challenge?</p>
                          </motion.div>
                              ) : isWheelSpinning ? (
                          <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-md max-w-md mx-auto"
                                >
                                  <p className="text-sm text-blue-600">Spinning the wheel of fate...</p>
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-center p-3 bg-gray-50 border border-gray-200 rounded-lg max-w-md mx-auto"
                                >
                                  <p className="text-sm text-gray-600">Spin the wheel to determine your punishment</p>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                          
                          <motion.div
                            className="grid grid-cols-2 gap-4"
                            variants={itemVariants}
                          >
                            <div className="space-y-2">
                            <label
                                htmlFor="stake"
                              className="text-sm font-medium"
                            >
                                Minimum Payout ($)
                            </label>
                            <Input
                                id="stake" 
                                type="number" 
                                placeholder="25" 
                                disabled={!isWheelSpun}
                                className={!isWheelSpun ? "bg-gray-100 cursor-not-allowed" : ""}
                                value={minimumStake}
                                onChange={(e) => setMinimumStake(e.target.value)}
                              />
                              {!isWheelSpun && (
                                <p className="text-xs text-amber-600">Spin the wheel first</p>
                              )}
                            </div>
                            <div className="space-y-2">
                            <label
                              htmlFor="deadline"
                              className="text-sm font-medium"
                            >
                              Betting Deadline
                            </label>
                              <Input 
                                id="deadline" 
                                type="datetime-local" 
                                disabled={!isWheelSpun}
                                className={!isWheelSpun ? "bg-gray-100 cursor-not-allowed" : ""}
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                              />
                            </div>
                          </motion.div>
                          
                          <motion.div
                            className="space-y-2"
                            variants={itemVariants}
                          >
                            <label
                              htmlFor="share-with"
                              className="text-sm font-medium"
                            >
                              Share With
                            </label>
                            <select
                              id="share-with"
                              className={`w-full border border-gray-300 rounded-md p-2 text-sm ${!isWheelSpun ? "bg-gray-100 cursor-not-allowed" : ""}`}
                              disabled={!isWheelSpun}
                              value={shareWith}
                              onChange={(e) => setShareWith(e.target.value)}
                            >
                              <option value="public">Anyone (Public)</option>
                              <option value="friends">Friends Only</option>
                              <option value="group">Specific Group</option>
                            </select>
                          </motion.div>
                        </motion.div>
                        <div className="flex justify-end gap-3">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              onClick={() => handleDialogChange(false)}
                            >
                              Cancel
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={isWheelSpun ? { scale: 1.05 } : {}}
                            whileTap={isWheelSpun ? { scale: 0.95 } : {}}
                          >
                            <Button 
                              className={`${isWheelSpun ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                              disabled={!isWheelSpun || !predictionText.trim()}
                              onClick={handleCreatePrediction}
                            >
                              Post Prediction
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    </DialogContent>
                  )}
                </AnimatePresence>
              </Dialog>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  borderColor: "#3B82F6",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 group transition-all hover:bg-blue-50"
                  asChild
                >
                  <Link href="/explore">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, delay: 2.2 }}
                      className="mr-2"
                    >
                      <Search className="h-5 w-5 group-hover:text-blue-600" />
                    </motion.div>
                    Browse Predictions
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            variants={staggerListVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={cardVariants}>
              <FeatureCard
                icon={Banknote}
                title="Keep It Friendly"
                description="Money stays within your friend group - no house edge, no platform fees, just pure social fun"
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <FeatureCard
                icon={Trophy}
                title="Double the Stakes"
                description="Win your friends' money or face hilarious punishment consequences that create lasting memories"
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <FeatureCard
                icon={Zap}
                title="More Excitement"
                description="Transform ordinary games into edge-of-your-seat experiences when your predictions and pride are on the line"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Main columns layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Left + middle column */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            variants={itemVariants}
          >
            {/* Active Predictions */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Active Predictions</h2>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="sm" className="gap-1">
                    All Predictions
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>

              <Tabs
                defaultValue="friends"
                className="mb-8"
                onValueChange={setSelectedTab}
              >
                <TabsList className="mb-4 relative">
                  {["friends", "trending", "new"].map((tab) => (
                    <motion.div
                      key={tab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <TabsTrigger value={tab} className="capitalize relative">
                        {tab}
                        {tab === selectedTab && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 mx-2"
                            layoutId="homePageActiveTab"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </TabsTrigger>
                    </motion.div>
                  ))}
                </TabsList>
                <AnimatePresence mode="wait">
                  <TabsContent value="friends" className="space-y-4">
                    <motion.div
                      variants={staggerListVariants}
                      initial="hidden"
                      animate="show"
                    >
                      {betsData.map((bet) => (
                        <motion.div
                          key={bet.id}
                          variants={cardVariants}
                          whileHover={{
                            y: -5,
                            boxShadow:
                              "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <BetCard bet={bet} />
                        </motion.div>
                      ))}
                      <motion.div
                        className="text-center py-4"
                        variants={itemVariants}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button variant="outline" className="gap-1">
                            Load More
                            <motion.div
                              animate={{ y: [0, 3, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.div>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="trending">
                    <motion.div
                      className="text-center py-16 text-gray-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p>Sign up to see trending predictions from the community!</p>
                      <motion.div
                        className="mt-4 inline-block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate="pulse"
                        variants={pulseVariants}
                      >
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Sign Up
                        </Button>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="new">
                    <motion.div
                      className="text-center py-16 text-gray-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p>Sign up to see the newest predictions!</p>
                      <motion.div
                        className="mt-4 inline-block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        variants={pulseVariants}
                        animate="pulse"
                      >
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Sign Up
                        </Button>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </motion.section>

            {/* Popular Punishments */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Popular Punishments</h2>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </motion.div>
              </div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                variants={staggerListVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <PunishmentCard
                    title="Hot Ones Challenge"
                    description="Eat progressively spicier hot wings on camera"
                    usageCount={42}
                  />
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <PunishmentCard
                    title="Bad Karaoke"
                    description="Sing a song of the group's choice at a public karaoke night"
                    usageCount={38}
                  />
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <PunishmentCard
                    title="Friends pick outfit for a day"
                    description="Let your friends choose your entire outfit for a full day"
                    usageCount={35}
                  />
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Upcoming Events */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Upcoming Events</h2>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="sm">
                    Full Calendar
                  </Button>
                </motion.div>
              </div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                variants={staggerListVariants}
                initial="hidden"
                animate="show"
              >
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="border-2 hover:border-blue-200 transition-all hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <motion.div animate={floatVariants.float}>
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </motion.div>
                          <motion.span
                            className="text-sm font-medium text-blue-600"
                            whileHover={{ scale: 1.1 }}
                          >
                            {event.date}
                          </motion.span>
                        </div>
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {event.betCount} active bets
                          </span>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button size="sm" variant="outline" className="h-8">
                              View
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          </motion.div>

          {/* Right column: sidebars */}
          <motion.div
            className="space-y-8"
            variants={staggerListVariants}
            initial="hidden"
            animate="show"
            transition={{ delayChildren: 0.8, staggerChildren: 0.2 }}
          >
            {/* Friend Activity */}
            <motion.div variants={cardVariants}>
              <Card className="border-2 border-blue-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <motion.div animate={floatVariants.float}>
                        <Users className="h-5 w-5 text-blue-600" />
                      </motion.div>
                      Friend Activity
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <motion.div
                    className="space-y-4"
                    variants={staggerListVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {friendActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 pb-4 border-b last:border-0"
                        variants={itemVariants}
                        whileHover={{
                          x: 5,
                          backgroundColor: "rgba(59, 130, 246, 0.05)",
                          borderRadius: "0.375rem",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <motion.div whileHover={{ scale: 1.1, rotate: 10 }}>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{activity.initials}</AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-1">
                            <span className="font-medium text-sm">
                              {activity.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {activity.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {activity.action}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.div
                    className="mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full" variant="outline">
                      See All Activity
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div variants={cardVariants}>
              <Card className="border-2 border-blue-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 10, 0] }}
                        transition={{
                          delay: 2.5,
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 5,
                        }}
                      >
                        <Award className="h-5 w-5 text-blue-600" />
                      </motion.div>
                      Your Stats
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 py-4">
                    {[
                      { value: "76%", label: "Win Rate" },
                      { value: "$124", label: "Net Winnings" },
                      { value: "12", label: "Predictions Made" },
                      { value: "3", label: "Punishments Taken" },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                      >
                        <motion.div
                          className="text-blue-600 text-2xl font-bold"
                          animate={
                            index === 0
                              ? { scale: [1, 1.1, 1] }
                              : {}
                          }
                          transition={{
                            delay: 2.8,
                            duration: 0.5,
                            repeat: 1,
                            repeatDelay: 5,
                          }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full" variant="outline">
                      View Full Stats
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trending Groups */}
            <motion.div variants={cardVariants}>
              <Card className="border-2 border-blue-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          delay: 3,
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 5,
                        }}
                      >
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </motion.div>
                      Trending Groups
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <motion.div
                    className="space-y-4"
                    variants={staggerListVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {popularGroups.map((group, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                        variants={itemVariants}
                        whileHover={{
                          x: 5,
                          backgroundColor: "rgba(59, 130, 246, 0.05)",
                          borderRadius: "0.375rem",
                        }}
                      >
                        <div>
                          <p className="font-medium">{group.name}</p>
                          <p className="text-xs text-gray-600">
                            {group.members} members
                          </p>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button size="sm" variant="outline" className="h-8">
                            Join
                          </Button>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.div
                    className="mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full" variant="outline">
                      Create Group
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* FOOTER */}
      <motion.footer
        className="border-t py-12 bg-gray-50 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                BOD
              </motion.div>
              <span className="font-bold">BetOrDare</span>
            </motion.div>
            <p className="text-sm text-gray-500 mt-2">
              © 2025 LeBTErs, Inc. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Making sports even more fun, one bet at a time.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-16">
            {[
              {
                title: "Company",
                links: [
                  { name: "About", href: "/about" },
                  { name: "Careers", href: "/careers" },
                  { name: "Blog", href: "/blog" },
                ],
              },
              {
                title: "Features",
                links: [
                  { name: "Predictions", href: "/predictions" },
                  { name: "Friend Groups", href: "/groups" },
                  { name: "Punishment Ideas", href: "/punishments" },
                ],
              },
              {
                title: "Support",
                links: [
                  { name: "Contact", href: "/contact" },
                  { name: "FAQ", href: "/faq" },
                  { name: "Terms", href: "/terms" },
                ],
              },
            ].map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + sectionIndex * 0.2 }}
              >
                <h4 className="font-medium text-sm">{section.title}</h4>
                <ul className="space-y-1">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 5, color: "#2563EB" }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-gray-900"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

// FEATURE CARD
interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="transition-all hover:shadow-md hover:border-blue-200 border-2 h-full overflow-hidden">
      <CardHeader className="pb-2">
        <motion.div
          className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2"
          whileHover={{ scale: 1.1, backgroundColor: "#DBEAFE" }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-6 w-6 text-blue-600" />
          </motion.div>
        </motion.div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

// BET CARD
interface Bet {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  prediction: string
  punishment: string
  stake: number
  deadline: string
  impliedOdds: number
  sportCategory: string
  contributors: Array<{
    name: string
    initials: string
    amount: number
  }>
  totalRaised: number
  progress: number
  comments: number
  reactions: number
}

function BetCard({ bet }: { bet: Bet }) {
  // Extract first name for more friendly display
  const firstName = bet.user.name.split(' ')[0];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:border-blue-200 border-2">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={bet.user.avatar} alt={bet.user.name} />
                <AvatarFallback>{bet.user.initials}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <p className="text-sm font-medium">{bet.user.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {bet.deadline}
                </span>
                <motion.span
                  className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded"
                  whileHover={{ scale: 1.1, backgroundColor: "#DBEAFE" }}
                >
                  {bet.sportCategory}
                </motion.span>
              </div>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="outline" size="sm">
              Details
            </Button>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="flex items-start gap-2 mb-2">
              <motion.div
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mt-0.5"
                whileHover={{ scale: 1.1, backgroundColor: "#DBEAFE" }}
              >
                Prediction
              </motion.div>
              <p className="font-medium flex-1">{bet.prediction}</p>
            </div>
            <div className="flex items-start gap-2">
              <motion.div
                className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full mt-0.5"
                whileHover={{ scale: 1.1, backgroundColor: "#FEE2E2" }}
                whileTap={{ scale: 0.9 }}
              >
                Punishment
              </motion.div>
              <p className="text-sm flex-1">{bet.punishment}</p>
            </div>
          </div>

          <motion.div
            className="bg-gray-50 p-3 rounded-md border border-gray-100"
            whileHover={{ backgroundColor: "#F8FAFC" }}
          >
            <p className="text-xs uppercase font-semibold text-gray-500 mb-2">Potential Outcomes</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-2 rounded-md">
                <p className="text-xs font-bold text-blue-700 mb-1">If {firstName} is right:</p>
                <p className="text-xs text-gray-700">
                  {firstName} collects ${bet.stake} from the community pool
                </p>
              </div>
              <div className="bg-orange-50 p-2 rounded-md">
                <p className="text-xs font-bold text-orange-700 mb-1">If {firstName} is wrong:</p>
                <p className="text-xs text-gray-700">
                  Friends get their money back and {firstName} does the punishment
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-between bg-gray-50 p-2 rounded-md"
            whileHover={{ backgroundColor: "#F8FAFC" }}
          >
            {[
              { value: `$${bet.stake}`, label: "Community Pool" },
              { value: `${bet.contributors.length}`, label: "Friends Supporting" },
              { value: `${bet.progress}%`, label: "Progress" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <motion.div
                  className="text-sm font-medium"
                  animate={
                    index === 1
                      ? {
                          scale: [1, 1.1, 1],
                          color: ["#000", "#2563EB", "#000"],
                        }
                      : {}
                  }
                  transition={{
                    delay: index * 0.3 + 3,
                    duration: 0.7,
                    repeat: 1,
                    repeatDelay: 7,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Friend contributions: ${bet.totalRaised} of ${bet.stake}</span>
              <span className="font-medium">${bet.stake - bet.totalRaised} more needed</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${bet.progress}%` }}
                transition={{ duration: 1, delay: 1 }}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1 pb-4 flex-col items-stretch gap-3">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {bet.contributors.map((contributor, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Avatar className="h-6 w-6 border-2 border-white">
                  <AvatarFallback className="text-xs">
                    {contributor.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">{contributor.name} contributed ${contributor.amount}</span>
              </motion.div>
            ))}
            <motion.div
              className="h-6 w-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600"
              whileHover={{ scale: 1.2, backgroundColor: "#E0F2FE", zIndex: 10 }}
            >
              +
            </motion.div>
          </div>
          <div className="flex items-center gap-3">
            <motion.span
              className="text-xs text-gray-500 flex items-center"
              whileHover={{ scale: 1.2, color: "#2563EB" }}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              {bet.comments}
            </motion.span>
            <motion.span
              className="text-xs text-gray-500 flex items-center"
              whileHover={{
                scale: 1.2,
                color: "#DC2626",
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: 1,
                repeatDelay: 5,
                duration: 0.4,
                delay: 3,
              }}
            >
              <Heart className="h-3 w-3 mr-1" />
              {bet.reactions}
            </motion.span>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.div
            className="flex-1"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Support {firstName} (${bet.stake - bet.totalRaised} more needed)
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9, rotate: 0 }}
          >
            <Button variant="outline" size="icon" className="h-10 w-10 flex-shrink-0">
              <Share2 className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </CardFooter>
    </Card>
  )
}

// PUNISHMENT CARD
interface PunishmentCardProps {
  title: string
  description: string
  usageCount: number
}

function PunishmentCard({ title, description, usageCount }: PunishmentCardProps) {
  return (
    <Card className="transition-all hover:shadow-md hover:border-blue-200 border-2 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <motion.span
            className="text-xs font-medium text-gray-500 flex items-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 5, 0],
                color: ["#F97316", "#DC2626", "#F97316"],
              }}
              transition={{
                repeat: Infinity,
                repeatDelay: 5,
                duration: 0.5,
              }}
            >
              <Flame className="h-3 w-3 mr-1 text-orange-500" />
            </motion.div>
            Used {usageCount} times
          </motion.span>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button size="sm" variant="ghost" className="gap-1">
              <Plus className="h-3 w-3" /> Use This
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}