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
              <Dialog open={isCreatingBet} onOpenChange={setIsCreatingBet}>
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
                    <DialogContent className="sm:max-w-[500px]">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DialogHeader>
                          <DialogTitle>Create a New Prediction</DialogTitle>
                          <DialogDescription>
                            Set your prediction, stake amount, and punishment
                            if you&apos;re wrong.
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
                            />
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
                                Required Stake ($)
                              </label>
                              <Input id="stake" type="number" placeholder="25" />
                            </div>
                            <div className="space-y-2">
                              <label
                                htmlFor="confidence"
                                className="text-sm font-medium"
                              >
                                Your Confidence (%)
                              </label>
                              <Input
                                id="confidence"
                                type="number"
                                placeholder="75"
                                min="1"
                                max="99"
                              />
                            </div>
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            variants={itemVariants}
                          >
                            <label
                              htmlFor="punishment"
                              className="text-sm font-medium"
                            >
                              Punishment if Wrong
                            </label>
                            <Input
                              id="punishment"
                              placeholder="Eat a spoonful of hot sauce on video"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            variants={itemVariants}
                          >
                            <label
                              htmlFor="deadline"
                              className="text-sm font-medium"
                            >
                              Betting Deadline
                            </label>
                            <Input id="deadline" type="datetime-local" />
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
                              className="w-full border border-gray-300 rounded-md p-2 text-sm"
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
                              onClick={() => setIsCreatingBet(false)}
                            >
                              Cancel
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button className="bg-blue-600 hover:bg-blue-700">
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
                      {bets.map((bet) => (
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
                    title="Rival Jersey Day"
                    description="Wear your most hated team's jersey all day in public"
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