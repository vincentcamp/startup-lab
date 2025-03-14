"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Filter, ArrowUpDown, TrendingUp, Clock, Hash, Calendar,
  ChevronDown, Star, X, BarChart, ArrowLeft
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Animation variants
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    } 
  }
}

const staggerListVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

// Sample data
const sportCategories = [
  { name: "All Sports", icon: BarChart, count: 245 },
  { name: "NBA", icon: BarChart, count: 87 },
  { name: "NFL", icon: BarChart, count: 63 },
  { name: "MLB", icon: BarChart, count: 41 },
  { name: "NHL", icon: BarChart, count: 36 },
  { name: "Soccer", icon: BarChart, count: 29 },
  { name: "Golf", icon: BarChart, count: 18 },
  { name: "UFC/MMA", icon: BarChart, count: 15 },
  { name: "Tennis", icon: BarChart, count: 12 },
]

const popularTags = [
  "Super Bowl", "Playoffs", "Finals", "MVP", "Championship", 
  "Tournament", "Series", "Draft", "All-Star", "Rivalry"
]

// Extended sample data for browse page
const browseBets = [
  {
    id: "1",
    user: {
      name: "Alex Thompson",
      avatar: "/avatars/alex.png",
      initials: "AT",
    },
    prediction: "Lakers will beat the Nets by at least 10 points on Sunday",
    punishment: "Eat a raw onion like an apple on Instagram Live",
    stake: 20,
    deadline: "Sunday, 7:30 PM",
    impliedOdds: 65,
    sportCategory: "NBA",
    tags: ["Lakers", "Nets", "Point Spread"],
    contributors: [
      { name: "Jordan", initials: "JK", amount: 5 },
      { name: "Mike", initials: "MS", amount: 10 },
    ],
    totalRaised: 15,
    progress: 75,
    comments: 8,
    reactions: 12,
    timePosted: "2 hours ago"
  },
  {
    id: "2",
    user: {
      name: "Jamie Wilson",
      avatar: "/avatars/jamie.png",
      initials: "JW",
    },
    prediction: "Chiefs will score at least 3 touchdowns against the Raiders",
    punishment: "Wear rival team jersey to work for a full day",
    stake: 30,
    deadline: "Monday, 8:00 PM",
    impliedOdds: 75,
    sportCategory: "NFL",
    tags: ["Chiefs", "Raiders", "Touchdowns"],
    contributors: [
      { name: "Chris", initials: "CD", amount: 10 },
      { name: "Taylor", initials: "TR", amount: 5 },
      { name: "Pat", initials: "PB", amount: 10 },
    ],
    totalRaised: 25,
    progress: 83,
    comments: 14,
    reactions: 23,
    timePosted: "5 hours ago"
  },
  {
    id: "3",
    user: {
      name: "Dana Rodriguez",
      avatar: "/avatars/dana.png",
      initials: "DR",
    },
    prediction: "Tiger Woods will finish in the top 10 at the Masters",
    punishment: "Shave head completely bald on livestream",
    stake: 50,
    deadline: "Sunday, 6:00 PM",
    impliedOdds: 35,
    sportCategory: "Golf",
    tags: ["Tiger Woods", "Masters", "Top 10"],
    contributors: [
      { name: "Shannon", initials: "SL", amount: 15 },
      { name: "Terry", initials: "TM", amount: 10 },
    ],
    totalRaised: 25,
    progress: 50,
    comments: 6,
    reactions: 18,
    timePosted: "Yesterday"
  },
  {
    id: "4",
    user: {
      name: "Morgan Lee",
      avatar: "/avatars/morgan.png",
      initials: "ML",
    },
    prediction: "Manchester United will win the Premier League this season",
    punishment: "Dye hair in rival team colors for a month",
    stake: 100,
    deadline: "End of season",
    impliedOdds: 20,
    sportCategory: "Soccer",
    tags: ["Manchester United", "Premier League", "Championship"],
    contributors: [
      { name: "Alex", initials: "AT", amount: 20 },
      { name: "Casey", initials: "CJ", amount: 15 },
      { name: "Robin", initials: "RL", amount: 25 },
    ],
    totalRaised: 60,
    progress: 60,
    comments: 31,
    reactions: 42,
    timePosted: "2 days ago"
  },
  {
    id: "5",
    user: {
      name: "Taylor Swift",
      avatar: "/avatars/taylor.png",
      initials: "TS",
    },
    prediction: "New York Yankees will win the World Series this year",
    punishment: "Wear a full Red Sox uniform to Yankee Stadium",
    stake: 75,
    deadline: "End of season",
    impliedOdds: 40,
    sportCategory: "MLB",
    tags: ["Yankees", "World Series", "Championship"],
    contributors: [
      { name: "Sam", initials: "SD", amount: 15 },
      { name: "Jesse", initials: "JF", amount: 20 },
      { name: "Quinn", initials: "QP", amount: 10 },
    ],
    totalRaised: 45,
    progress: 60,
    comments: 22,
    reactions: 37,
    timePosted: "3 days ago"
  },
  {
    id: "6",
    user: {
      name: "Casey Jordan",
      avatar: "/avatars/casey.png",
      initials: "CJ",
    },
    prediction: "Connor McGregor will win his next fight by knockout",
    punishment: "Take a beginner MMA class and post the full session",
    stake: 60,
    deadline: "After next fight",
    impliedOdds: 55,
    sportCategory: "UFC/MMA",
    tags: ["McGregor", "UFC", "Knockout"],
    contributors: [
      { name: "Morgan", initials: "ML", amount: 15 },
      { name: "Alex", initials: "AT", amount: 10 },
    ],
    totalRaised: 25,
    progress: 42,
    comments: 18,
    reactions: 29,
    timePosted: "Last week"
  },
]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Sports")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filteredBets, setFilteredBets] = useState(browseBets)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [stakeRange, setStakeRange] = useState([0, 100])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("all")

  // Filter bets based on search, category, etc.
  useEffect(() => {
    let result = browseBets

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(bet => 
        bet.prediction.toLowerCase().includes(query) ||
        bet.user.name.toLowerCase().includes(query) ||
        bet.punishment.toLowerCase().includes(query) ||
        bet.sportCategory.toLowerCase().includes(query) ||
        bet.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by category
    if (selectedCategory !== "All Sports") {
      result = result.filter(bet => bet.sportCategory === selectedCategory)
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      result = result.filter(bet => 
        bet.tags.some(tag => selectedTags.includes(tag))
      )
    }

    // Filter by stake range
    result = result.filter(bet => 
      bet.stake >= stakeRange[0] && bet.stake <= stakeRange[1]
    )

    // Sort results
    switch (sortBy) {
      case "newest":
        // In a real app, you'd sort by actual timestamps
        break
      case "oldest":
        result = [...result].reverse()
        break
      case "highest-stake":
        result = [...result].sort((a, b) => b.stake - a.stake)
        break
      case "most-popular":
        result = [...result].sort((a, b) => b.reactions - a.reactions)
        break
    }

    setFilteredBets(result)
  }, [searchQuery, selectedCategory, sortBy, selectedTags, stakeRange])

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
              <motion.div 
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs"
                whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                BOD
              </motion.div>
              <span className="font-bold text-xl tracking-tight">BetOrDare</span>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex-1 max-w-xl mx-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search predictions, sports, users..." 
                className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4 text-gray-400" />
                </motion.button>
              )}
            </div>
          </motion.div>
          
          <div className="flex items-center gap-3">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filter Predictions</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Sport Categories</h3>
                    <div className="space-y-2">
                      {sportCategories.map(category => (
                        <div key={category.name} className="flex items-center">
                          <Checkbox 
                            id={`category-${category.name}`} 
                            checked={
                              (selectedCategory === category.name) || 
                              (selectedCategory === "All Sports" && category.name === "All Sports")
                            }
                            onCheckedChange={() => setSelectedCategory(category.name)}
                          />
                          <label 
                            htmlFor={`category-${category.name}`} 
                            className="ml-2 text-sm cursor-pointer flex items-center justify-between w-full"
                          >
                            <span>{category.name}</span>
                            <span className="text-xs text-gray-500">{category.count}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Stake Amount</h3>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[0, 100]} 
                        max={100} 
                        step={1}
                        value={stakeRange}
                        onValueChange={setStakeRange}
                        className="my-6"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>${stakeRange[0]}</span>
                        <span>${stakeRange[1]}+</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map(tag => (
                        <Badge 
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => 
                            selectedTags.includes(tag) ? removeTag(tag) : addTag(tag)
                          }
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedCategory("All Sports")
                        setSelectedTags([])
                        setStakeRange([0, 100])
                      }}
                    >
                      Reset
                    </Button>
                    <Button onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem 
                  className={sortBy === "newest" ? "bg-blue-50 text-blue-600" : ""}
                  onClick={() => setSortBy("newest")}
                >
                  <Clock className="mr-2 h-4 w-4" /> Newest
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={sortBy === "oldest" ? "bg-blue-50 text-blue-600" : ""}
                  onClick={() => setSortBy("oldest")}
                >
                  <Clock className="mr-2 h-4 w-4" /> Oldest
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={sortBy === "highest-stake" ? "bg-blue-50 text-blue-600" : ""}
                  onClick={() => setSortBy("highest-stake")}
                >
                  <TrendingUp className="mr-2 h-4 w-4" /> Highest Stake
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={sortBy === "most-popular" ? "bg-blue-50 text-blue-600" : ""}
                  onClick={() => setSortBy("most-popular")}
                >
                  <Star className="mr-2 h-4 w-4" /> Most Popular
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
        <motion.div
          className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl font-bold">Browse Predictions</h1>
            <p className="text-gray-600">
              {filteredBets.length} {selectedCategory !== "All Sports" ? selectedCategory : ""} predictions available
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <Badge 
                key={tag}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Hash className="h-3 w-3" />
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {selectedCategory !== "All Sports" && (
              <Badge 
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Calendar className="h-3 w-3" />
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All Sports")} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </motion.div>

        <Tabs 
          defaultValue="all" 
          className="mb-8"
          onValueChange={setSelectedTab}
        >
          <TabsList className="mb-4 relative">
            {["all", "trending", "ending-soon", "high-stakes", "my-interests"].map((tab) => (
              <motion.div
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <TabsTrigger value={tab} className="capitalize relative">
                  {tab.replace(/-/g, " ")}
                  {tab === selectedTab && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 mx-2"
                      layoutId="explorePageActiveTab"
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
            <TabsContent value="all">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerListVariants}
                initial="hidden"
                animate="show"
              >
                {filteredBets.length > 0 ? (
                  filteredBets.map((bet) => (
                    <motion.div 
                      key={bet.id}
                      variants={cardVariants}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <BetCard bet={bet} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    className="col-span-full text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-gray-500 mb-4">No predictions match your filters</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedCategory("All Sports")
                        setSearchQuery("")
                        setSelectedTags([])
                        setStakeRange([0, 100])
                      }}
                    >
                      Reset Filters
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>

            {/* Other tabs would have similar content but different filtering/sorting */}
            <TabsContent value="trending">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerListVariants}
                initial="hidden"
                animate="show"
              >
                {filteredBets
                  .sort((a, b) => b.reactions - a.reactions)
                  .slice(0, 6)
                  .map((bet) => (
                    <motion.div 
                      key={bet.id}
                      variants={cardVariants}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <BetCard bet={bet} />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="ending-soon">
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-500 mb-4">Sign in to see predictions ending soon</p>
                <Button className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
              </motion.div>
            </TabsContent>

            <TabsContent value="high-stakes">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerListVariants}
                initial="hidden"
                animate="show"
              >
                {filteredBets
                  .sort((a, b) => b.stake - a.stake)
                  .slice(0, 6)
                  .map((bet) => (
                    <motion.div 
                      key={bet.id}
                      variants={cardVariants}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <BetCard bet={bet} />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="my-interests">
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-500 mb-4">Sign in to see predictions that match your interests</p>
                <Button className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>

        {filteredBets.length > 6 && (
          <motion.div 
            className="text-center py-8"
            variants={itemVariants}
            initial="hidden"
            animate="show"
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
        )}
      </main>
    </div>
  )
}

interface Bet {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  prediction: string;
  punishment: string;
  stake: number;
  deadline: string;
  impliedOdds: number;
  sportCategory: string;
  tags: string[];
  contributors: Array<{
    name: string;
    initials: string;
    amount: number;
  }>;
  totalRaised: number;
  progress: number;
  comments: number;
  reactions: number;
  timePosted: string;
}

function BetCard({ bet }: { bet: Bet }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:border-blue-200 border-2 h-full flex flex-col">
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
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium">{bet.user.name}</p>
                <span className="text-xs text-gray-500">{bet.timePosted}</span>
              </div>
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
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button variant="outline" size="sm" className="h-8 px-2">
              <Star className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
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
            className="flex justify-between bg-gray-50 p-2 rounded-md"
            whileHover={{ backgroundColor: "#F8FAFC" }}
          >
            <div className="text-center">
              <div className="text-sm font-medium">${bet.stake}</div>
              <div className="text-xs text-gray-500">Total Stake</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{bet.impliedOdds}%</div>
              <div className="text-xs text-gray-500">Implied Odds</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">
                {(100 / bet.impliedOdds).toFixed(2)}x
              </div>
              <div className="text-xs text-gray-500">Potential Payout</div>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-1">
            {bet.tags.map((tag, index) => (
              <motion.span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                whileHover={{ backgroundColor: "#E0F2FE", color: "#2563EB" }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Stake progress: ${bet.totalRaised} of ${bet.stake}</span>
              <span className="font-medium">{bet.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${bet.progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1 pb-4 flex-col items-stretch gap-3 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {bet.contributors.map((contributor, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Avatar className="h-6 w-6 border-2 border-white">
                  <AvatarFallback className="text-xs">{contributor.initials}</AvatarFallback>
                </Avatar>
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
              {bet.comments}
            </motion.span>
            <motion.span 
              className="text-xs text-gray-500 flex items-center"
              whileHover={{ scale: 1.2, color: "#DC2626" }}
            >
              {bet.reactions}
            </motion.span>
          </div>
        </div>
        <motion.div 
          className="flex-1"
          whileHover={{ 
            scale: 1.03, 
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Join Bet (${bet.stake - bet.totalRaised} left)
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}