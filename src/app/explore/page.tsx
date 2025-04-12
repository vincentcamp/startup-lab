"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Filter, ArrowUpDown, TrendingUp, Clock, Hash, Calendar,
  ChevronDown, Star, X, BarChart, ArrowLeft, Check
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
  { name: "All Sports", icon: BarChart, count: 26 },
  { name: "NBA", icon: BarChart, count: 5 },
  { name: "NFL", icon: BarChart, count: 5 },
  { name: "MLB", icon: BarChart, count: 2 },
  { name: "NHL", icon: BarChart, count: 1 },
  { name: "Soccer", icon: BarChart, count: 4 },
  { name: "Golf", icon: BarChart, count: 2 },
  { name: "UFC/MMA", icon: BarChart, count: 2 },
  { name: "Tennis", icon: BarChart, count: 3 },
  { name: "F1", icon: BarChart, count: 1 },
  { name: "WNBA", icon: BarChart, count: 1 },
]

const popularTags = [
  "Super Bowl", "Playoffs", "Finals", "MVP", "Championship", 
  "Tournament", "Series", "Draft", "All-Star", "Rivalry"
]

// Modified sample data with varied punishment tiers and more prediction cards
const browseBets = [
  {
    id: "0",
    user: {
      name: "Mike Johnson",
      avatar: "/avatars/mike.png",
      initials: "MJ",
    },
    prediction: "Boston Celtics will repeat as NBA champions in 2025",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Lakers jersey to a Warriors home game", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Get a temporary tattoo of LeBron's face on your bicep", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Shave head and eyebrows bald on livestream while wearing a Lakers cheerleader outfit", color: "#EF4444" }
    ],
    currentTier: 2,
    stake: 20,
    deadline: "End of season",
    impliedOdds: 30,
    sportCategory: "NBA",
    tags: ["Warriors", "Championship", "Finals"],
    contributors: [
      { name: "Jordan", initials: "JK", amount: 75 },
      { name: "Mike", initials: "MS", amount: 130 },
      { name: "Leo", initials: "LJ", amount: 200 },
      { name: "Kevin", initials: "KD", amount: 95 },
    ],
    totalRaised: 500,
    progress: 100,
    comments: 42,
    reactions: 87,
    timePosted: "1 day ago"
  },
  {
    id: "1",
    user: {
      name: "Alex Thompson",
      avatar: "/avatars/alex.png",
      initials: "AT",
    },
    prediction: "Lakers will beat the Nets by at least 20 points on Christmas Day",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Nets jersey during Lakers victory parade", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Eat a ghost pepper on livestream while reciting Nets roster", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Attend Lakers game with full body painted in Nets colors and 'LeBron Who?' sign", color: "#EF4444" }
    ],
    currentTier: 0,
    stake: 20,
    deadline: "Sunday, 7:30 PM",
    impliedOdds: 65,
    sportCategory: "NBA",
    tags: ["Lakers", "Nets", "Point Spread"],
    contributors: [
      { name: "Jordan", initials: "JK", amount: 15 },
      { name: "Mike", initials: "MS", amount: 10 },
    ],
    totalRaised: 25,
    progress: 25,
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
    prediction: "Chiefs will achieve a historic threepeat as Super Bowl champions",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Raiders jersey to next Chiefs tailgate", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Do 50 pushups at halftime in Raiders face paint", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Get ice water dumped on you while wearing only a Raiders-themed speedo at Arrowhead Stadium", color: "#EF4444" }
    ],
    currentTier: 1,
    stake: 20,
    deadline: "Monday, 8:00 PM",
    impliedOdds: 75,
    sportCategory: "NFL",
    tags: ["Chiefs", "Raiders", "Touchdowns"],
    contributors: [
      { name: "Chris", initials: "CD", amount: 28 },
      { name: "Taylor", initials: "TR", amount: 37 },
      { name: "Pat", initials: "PB", amount: 15 },
    ],
    totalRaised: 80,
    progress: 80,
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
    prediction: "Tiger Woods will win one more major championship before retiring",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear a ridiculous golf outfit to local country club", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Play 18 holes using only a putter and driver", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Caddy in full tiger costume with 'Tiger Who?' on back, speaking only in tiger growls", color: "#EF4444" }
    ],
    currentTier: 0,
    stake: 20,
    deadline: "Sunday, 6:00 PM",
    impliedOdds: 35,
    sportCategory: "Golf",
    tags: ["Tiger Woods", "Masters", "Top 10"],
    contributors: [
      { name: "Shannon", initials: "SL", amount: 12 },
      { name: "Terry", initials: "TM", amount: 8 },
    ],
    totalRaised: 20,
    progress: 25,
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
    prediction: "Manchester United will win the Premier League after years of rebuilding",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Man City jersey to Old Trafford match", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Get 'I ❤️ Man City' temporary face tattoo for derby day", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Clean stadium toilets while wearing tutu and 'I Was Wrong' jersey after Man City win", color: "#EF4444" }
    ],
    currentTier: 2,
    stake: 20,
    deadline: "End of season",
    impliedOdds: 20,
    sportCategory: "Soccer",
    tags: ["Manchester United", "Premier League", "Championship"],
    contributors: [
      { name: "Alex", initials: "AT", amount: 48 },
      { name: "Casey", initials: "CJ", amount: 62 },
      { name: "Robin", initials: "RL", amount: 43 },
      { name: "Tia", initials: "TJ", amount: 37 },
    ],
    totalRaised: 190,
    progress: 100,
    comments: 31,
    reactions: 42,
    timePosted: "2 days ago"
  },
  {
    id: "5",
    user: {
      name: "Taylor Reynolds",
      avatar: "/avatars/taylor.png",
      initials: "TR",
    },
    prediction: "Yankees will win the World Series after their blockbuster offseason moves",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Red Sox jersey to next Yankees game", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Record parody song 'Red Sox Are My Lover'", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Get reverse mohawk haircut dyed in Red Sox colors for team's next playoff series", color: "#EF4444" }
    ],
    currentTier: 1,
    stake: 20,
    deadline: "End of season",
    impliedOdds: 40,
    sportCategory: "MLB",
    tags: ["Yankees", "World Series", "Championship"],
    contributors: [
      { name: "Sam", initials: "SD", amount: 22 },
      { name: "Jesse", initials: "JF", amount: 33 },
      { name: "Quinn", initials: "QP", amount: 15 },
    ],
    totalRaised: 0,
    progress: 0,
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
    prediction: "Conor McGregor will win his comeback fight by knockout",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear opponent's walkout shirt for a week", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Take a body shot from amateur MMA fighter", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Full body wax on livestream then take a real leg kick from a professional fighter", color: "#EF4444" }
    ],
    currentTier: 0,
    stake: 20,
    deadline: "After next fight",
    impliedOdds: 55,
    sportCategory: "UFC/MMA",
    tags: ["McGregor", "UFC", "Knockout"],
    contributors: [
      { name: "Morgan", initials: "ML", amount: 27 },
      { name: "Alex", initials: "AT", amount: 13 },
    ],
    totalRaised: 40,
    progress: 40,
    comments: 18,
    reactions: 29,
    timePosted: "Last week"
  },
  {
    id: "7",
    user: {
      name: "Luis Hamilton",
      avatar: "/avatars/luis.png",
      initials: "LH",
    },
    prediction: "NFL will successfully expand to Ireland and Spain for international games",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Red Bull racing cap for a race weekend", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Do press conference in Verstappen orange wig", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Race go-karts in Red Bull suit after drinking 2 gallons of milk and spicy curry", color: "#EF4444" }
    ],
    currentTier: 2,
    stake: 20,
    deadline: "End of F1 season",
    impliedOdds: 25,
    sportCategory: "F1",
    tags: ["Formula 1", "Verstappen", "Mercedes"],
    contributors: [
      { name: "Toto", initials: "TW", amount: 45 },
      { name: "Charles", initials: "CL", amount: 38 },
      { name: "George", initials: "GR", amount: 52 },
      { name: "Lando", initials: "LN", amount: 67 },
    ],
    totalRaised: 202,
    progress: 100,
    comments: 36,
    reactions: 51,
    timePosted: "3 days ago"
  },
  {
    id: "8",
    user: {
      name: "Sarah Williams",
      avatar: "/avatars/sarah.png",
      initials: "SW",
    },
    prediction: "Coco Gauff will win her first Grand Slam championship",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear 'Team Anyone But Coco' shirt to US Open", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Play tennis in ballroom dress on public courts", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Play exhibition match with frying pan while in full chicken costume, clucking after points", color: "#EF4444" }
    ],
    currentTier: 1,
    stake: 20,
    deadline: "End of year",
    impliedOdds: 40,
    sportCategory: "Tennis",
    tags: ["Grand Slam", "Coco Gauff", "US Open"],
    contributors: [
      { name: "Venus", initials: "VW", amount: 30 },
      { name: "Naomi", initials: "NO", amount: 25 },
    ],
    totalRaised: 55,
    progress: 55,
    comments: 19,
    reactions: 33,
    timePosted: "This week"
  },
  {
    id: "9",
    user: {
      name: "Patrick Moore",
      avatar: "/avatars/patrick.png",
      initials: "PM",
    },
    prediction: "Chiefs will repeat as Super Bowl champions with Mahomes winning regular season MVP",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Raiders jersey on The Pat McAfee Show", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Let Travis Kelce style your hair for a month", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Perform halftime dance routine in full lobster costume while singing Baby Shark", color: "#EF4444" }
    ],
    currentTier: 2,
    stake: 20,
    deadline: "End of NFL season",
    impliedOdds: 35,
    sportCategory: "NFL",
    tags: ["Chiefs", "Super Bowl", "Dynasty"],
    contributors: [
      { name: "Travis", initials: "TK", amount: 75 },
      { name: "Andy", initials: "AR", amount: 60 },
      { name: "Taylor", initials: "TS", amount: 100 },
      { name: "Harrison", initials: "HB", amount: 45 },
      { name: "Chris", initials: "CJ", amount: 120 },
    ],
    totalRaised: 400,
    progress: 100,
    comments: 54,
    reactions: 112,
    timePosted: "4 days ago"
  },
  {
    id: "10",
    user: {
      name: "Steve Carter",
      avatar: "/avatars/steve.png",
      initials: "SC",
    },
    prediction: "Stephen Curry will break his own single-game three-point record",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear LeBron jersey during pre-game warmups", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Use granny-style free throws for entire game", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Play game with oven mitts taped on hands while wearing inflatable sumo costume", color: "#EF4444" }
    ],
    currentTier: 1,
    stake: 20,
    deadline: "Regular season",
    impliedOdds: 25,
    sportCategory: "NBA",
    tags: ["Warriors", "3-Point", "Record"],
    contributors: [
      { name: "Klay", initials: "KT", amount: 30 },
      { name: "Draymond", initials: "DG", amount: 25 },
      { name: "Kerr", initials: "SK", amount: 20 },
    ],
    totalRaised: 75,
    progress: 75,
    comments: 29,
    reactions: 67,
    timePosted: "5 days ago"
  },
  {
    id: "11",
    user: {
      name: "Marcus Lopez",
      avatar: "/avatars/marcus.png",
      initials: "ML",
    },
    prediction: "Inter Miami will win the MLS Cup in dramatic fashion",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear opponent's jersey for team photo day", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Let friends style my hair for a week", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Attend game in rival's mascot costume and stay in character the entire time", color: "#EF4444" }
    ],
    currentTier: 0,
    stake: 20,
    deadline: "End of MLS season",
    impliedOdds: 20,
    sportCategory: "Soccer",
    tags: ["MLS", "Inter Miami", "Championship"],
    contributors: [
      { name: "Luis", initials: "LS", amount: 15 },
      { name: "Bruno", initials: "BS", amount: 5 },
    ],
    totalRaised: 20,
    progress: 20,
    comments: 41,
    reactions: 95,
    timePosted: "2 days ago"
  },
  {
    id: "12",
    user: {
      name: "Samantha Baker",
      avatar: "/avatars/samantha.png",
      initials: "SB",
    },
    prediction: "Simone Biles will successfully land a triple-double on beam in competition",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear 'Gravity Is Not My Friend' t-shirt to gym", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Compete in a dinosaur costume for local charity exhibition", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Perform comedy routine as failed gymnast with 'World's Most Delusional Gymnast' outfit", color: "#EF4444" }
    ],
    currentTier: 2,
    stake: 20,
    deadline: "Next major competition",
    impliedOdds: 30,
    sportCategory: "Gymnastics",
    tags: ["Olympics", "Biles", "Gold Medal"],
    contributors: [
      { name: "Sophia", initials: "SL", amount: 40 },
      { name: "Jordan", initials: "JC", amount: 35 },
      { name: "Gabby", initials: "GD", amount: 30 },
      { name: "McKayla", initials: "MM", amount: 45 },
      { name: "Natalie", initials: "NL", amount: 140 },
      { name: "Alina", initials: "AR", amount: 110 },
    ],
    totalRaised: 400,
    progress: 100,
    comments: 27,
    reactions: 82,
    timePosted: "1 week ago"
  },
  {
    id: "13",
    user: {
      name: "Nathan Davidson",
      avatar: "/avatars/nathan.png",
      initials: "ND",
    },
    prediction: "Novak Djokovic will win his 25th Grand Slam title, breaking Margaret Court's record",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear 'Team Fedal' shirt at local tennis club", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Imitate McEnroe's meltdowns during casual match", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Play match with feet tied together, shouting 'Djokovic is overrated!' after lost points", color: "#EF4444" }
    ],
    currentTier: 1,
    stake: 20,
    deadline: "End of tennis season",
    impliedOdds: 15,
    sportCategory: "Tennis",
    tags: ["Grand Slam", "Djokovic", "Calendar Slam"],
    contributors: [
      { name: "Roger", initials: "RF", amount: 30 },
      { name: "Rafa", initials: "RN", amount: 35 },
    ],
    totalRaised: 65,
    progress: 65,
    comments: 38,
    reactions: 76,
    timePosted: "6 days ago"
  },
  {
    id: "14",
    user: {
      name: "Sam Ohtani",
      avatar: "/avatars/sam.png",
      initials: "SO",
    },
    prediction: "Shohei Ohtani will hit 50 home runs and win Cy Young as a pitcher",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Giants jersey to Dodgers home game", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Play softball batting opposite-handed", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Pitch in full ballet outfit with 'Ohtani Rejected Me' on back, throwing underhand between legs", color: "#EF4444" }
    ],
    currentTier: 0,
    stake: 20,
    deadline: "End of MLB season",
    impliedOdds: 10,
    sportCategory: "MLB",
    tags: ["MVP", "Dodgers", "Two-Way Player"],
    contributors: [
      { name: "Mike", initials: "MB", amount: 15 },
      { name: "Fred", initials: "FF", amount: 5 },
    ],
    totalRaised: 20,
    progress: 20,
    comments: 47,
    reactions: 103,
    timePosted: "3 days ago"
  },
  {
    id: "15",
    user: {
      name: "Kelly Lockhart",
      avatar: "/avatars/kelly.png",
      initials: "KL",
    },
    prediction: "Katie Ledecky will break the world record in the 1500m freestyle",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear floaties to local pool", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Race wearing a mermaid tail costume at community swim meet", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Perform synchronized swimming routine in Jell-O while wearing fish costume", color: "#EF4444" }
    ],
    currentTier: 2,
    stake: 20,
    deadline: "Olympics",
    impliedOdds: 40,
    sportCategory: "Swimming",
    tags: ["Olympics", "World Record", "Gold Medal"],
    contributors: [
      { name: "Michael", initials: "MP", amount: 50 },
      { name: "Caleb", initials: "CD", amount: 45 },
      { name: "Missy", initials: "MF", amount: 40 },
      { name: "Ryan", initials: "RL", amount: 35 },
    ],
    totalRaised: 170,
    progress: 100,
    comments: 22,
    reactions: 68,
    timePosted: "5 days ago"
  },
  {
    id: "16",
    user: {
      name: "Tom Bennett",
      avatar: "/avatars/tom.png",
      initials: "TB",
    },
    prediction: "Tom Brady will come out of retirement to coach an NFL team",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Jets jersey to NFL viewing party", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Let friends style my hair for a week", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Make humiliating Brady lowlight reel dressed as Eli Manning and present at fantasy draft", color: "#EF4444" }
    ],
    currentTier: 2,
    stake: 20,
    deadline: "End of NFL season",
    impliedOdds: 75,
    sportCategory: "NFL",
    tags: ["Retirement", "Brady", "FOX"],
    contributors: [
      { name: "Peter", initials: "PM", amount: 100 },
      { name: "Greg", initials: "RG", amount: 85 },
      { name: "Julian", initials: "JE", amount: 70 },
      { name: "Bill", initials: "BB", amount: 65 },
      { name: "Gina", initials: "GB", amount: 210 },
    ],
    totalRaised: 530,
    progress: 100,
    comments: 89,
    reactions: 175,
    timePosted: "1 week ago"
  },
  {
    id: "17",
    user: {
      name: "Leonard James",
      avatar: "/avatars/leonard.png",
      initials: "LJ",
    },
    prediction: "LeBron James will average a triple-double in his 22nd NBA season",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Jordan Bulls jersey to Lakers game", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Recreate 'The Decision' for where I'm eating lunch on social media", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Shave head, add fake receding hairline, wear 'LeBald James' jersey for charity game", color: "#EF4444" }
    ],
    currentTier: 2,
    stake: 20,
    deadline: "End of regular season",
    impliedOdds: 15,
    sportCategory: "NBA",
    tags: ["Lakers", "Triple-Double", "LeBron"],
    contributors: [
      { name: "Brian", initials: "BJ", amount: 50 },
      { name: "Anthony", initials: "AD", amount: 75 },
      { name: "Jason", initials: "JR", amount: 40 },
      { name: "Sarah", initials: "SJ", amount: 150 },
      { name: "Richard", initials: "RP", amount: 200 },
      { name: "Marcus", initials: "MC", amount: 185 },
    ],
    totalRaised: 700,
    progress: 100,
    comments: 112,
    reactions: 203,
    timePosted: "3 days ago"
  },
  {
    id: "18",
    user: {
      name: "Chris Rodriguez",
      avatar: "/avatars/chris.png",
      initials: "CR",
    },
    prediction: "Cristiano Ronaldo will announce retirement after one final record-breaking season",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Messi jersey to soccer viewing party", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Dye my hair pink for a weekend", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Get Ronaldo haircut and play in 'Penaldo #2' jersey with 3-inch platform cleats", color: "#EF4444" }
    ],
    currentTier: 1,
    stake: 20,
    deadline: "End of Saudi Pro League season",
    impliedOdds: 60,
    sportCategory: "Soccer",
    tags: ["Al Nassr", "Saudi Pro League", "Goal Scorer"],
    contributors: [
      { name: "George", initials: "GR", amount: 25 },
      { name: "Adam", initials: "AR", amount: 30 },
      { name: "Kevin", initials: "KB", amount: 35 },
    ],
    totalRaised: 90,
    progress: 90,
    comments: 58,
    reactions: 129,
    timePosted: "4 days ago"
  },
  {
    id: "19",
    user: {
      name: "Caitlin Parker",
      avatar: "/avatars/caitlin.png",
      initials: "CP",
    },
    prediction: "Caitlin Clark will break the WNBA rookie scoring record and win MVP",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear rival WNBA jersey to Indiana Fever home game", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Let friends choose my hairstyle for a weekend", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Play game in princess dress with 5x prescription goggles, flippers, and oven mitts", color: "#EF4444" }
    ],
    currentTier: 2,
    stake: 20,
    deadline: "End of WNBA season",
    impliedOdds: 45,
    sportCategory: "WNBA",
    tags: ["Fever", "Rookie", "Record Breaker"],
    contributors: [
      { name: "Angela", initials: "AR", amount: 45 },
      { name: "Ava", initials: "AW", amount: 65 },
      { name: "Susan", initials: "SB", amount: 75 },
      { name: "Diana", initials: "DT", amount: 60 },
      { name: "Sabrina", initials: "SI", amount: 55 },
    ],
    totalRaised: 300,
    progress: 100,
    comments: 67,
    reactions: 152,
    timePosted: "5 days ago"
  },
  {
    id: "20",
    user: {
      name: "Lamar Jackson",
      avatar: "/avatars/lamar.png",
      initials: "LJ",
    },
    prediction: "Ravens will win Super Bowl with Lamar Jackson as Super Bowl MVP",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear Steelers jersey to Ravens facility", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Do postgame interview in chicken costume", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Play charity game dressed as giant toilet labeled 'Lamar's Throne' making flushing sounds", color: "#EF4444" }
    ],
    currentTier: 1,
    stake: 20,
    deadline: "Super Bowl Sunday",
    impliedOdds: 20,
    sportCategory: "NFL",
    tags: ["Ravens", "Super Bowl", "MVP"],
    contributors: [
      { name: "Mark", initials: "MA", amount: 30 },
      { name: "John", initials: "JH", amount: 25 },
      { name: "Zay", initials: "ZF", amount: 20 },
    ],
    totalRaised: 75,
    progress: 75,
    comments: 43,
    reactions: 88,
    timePosted: "2 days ago"
  },
  {
    id: "21",
    user: {
      name: "Tyler Woods",
      avatar: "/avatars/tyler.png",
      initials: "TW",
    },
    prediction: "The Ryder Cup will see a dramatic American victory on European soil",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear 'Phil Was Right' t-shirt during golf outing", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Play 18 holes with beginner clubs from Walmart", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Caddy in tiger-striped speedo making cat noises after every shot for a full round", color: "#EF4444" }
    ],
    currentTier: 2,
    stake: 20,
    deadline: "End of next season",
    impliedOdds: 10,
    sportCategory: "Golf",
    tags: ["Majors", "Comeback", "Tiger"],
    contributors: [
      { name: "Ryan", initials: "RM", amount: 95 },
      { name: "Philip", initials: "PM", amount: 85 },
      { name: "Jack", initials: "JN", amount: 150 },
      { name: "Charlie", initials: "CW", amount: 270 },
    ],
    totalRaised: 600,
    progress: 100,
    comments: 77,
    reactions: 163,
    timePosted: "1 week ago"
  },
  {
    id: "22",
    user: {
      name: "Alex Morgan",
      avatar: "/avatars/alexm.png",
      initials: "AM",
    },
    prediction: "USWNT will win Olympic gold medal in dominant fashion",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear rival country's jersey to viewing party", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Do social media posts speaking only in made-up language for a day", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Play match dressed as giant baby complete with diaper and throw tantrums at goals", color: "#EF4444" }
    ],
    currentTier: 0,
    stake: 20,
    deadline: "End of Olympics",
    impliedOdds: 50,
    sportCategory: "Soccer",
    tags: ["USWNT", "Olympics", "Gold Medal"],
    contributors: [
      { name: "Megan", initials: "MR", amount: 15 },
      { name: "Trinity", initials: "TR", amount: 10 },
    ],
    totalRaised: 25,
    progress: 25,
    comments: 31,
    reactions: 72,
    timePosted: "3 days ago"
  },
  {
    id: "23",
    user: {
      name: "Josh Jones",
      avatar: "/avatars/josh.png",
      initials: "JJ",
    },
    prediction: "Jon Jones will successfully defend his heavyweight title against Stipe Miocic and Tom Aspinall",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear 'DC Is The Real GOAT' shirt at UFC watch party", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Train in pink ballerina outfit at local gym", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Full body wax on livestream while wearing tinfoil belt and reciting DC poetry", color: "#EF4444" }
    ],
    currentTier: 1,
    stake: 20,
    deadline: "End of year",
    impliedOdds: 30,
    sportCategory: "UFC/MMA",
    tags: ["Heavyweight", "Champion", "UFC"],
    contributors: [
      { name: "Daniel", initials: "DC", amount: 35 },
      { name: "Israel", initials: "IA", amount: 40 },
    ],
    totalRaised: 75,
    progress: 75,
    comments: 58,
    reactions: 111,
    timePosted: "6 days ago"
  },
  {
    id: "24",
    user: {
      name: "Natalie Osaka",
      avatar: "/avatars/natalie.png",
      initials: "NO",
    },
    prediction: "Naomi Osaka will attempt to win all four Grand Slams in the same year",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear 'Tennis is too hard' shirt during tennis club meeting", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Play doubles match with non-dominant hand", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Play in tiny 70s outfit with racket tied to wrist, hopping on one foot between points", color: "#EF4444" }
    ],
    currentTier: 2,
    stake: 20,
    deadline: "End of tennis season",
    impliedOdds: 5,
    sportCategory: "Tennis",
    tags: ["Grand Slam", "Calendar Slam", "Osaka"],
    contributors: [
      { name: "Serena", initials: "SW", amount: 150 },
      { name: "Coco", initials: "CG", amount: 120 },
      { name: "Venus", initials: "VW", amount: 130 },
      { name: "Iga", initials: "IS", amount: 95 },
      { name: "Kate", initials: "SK", amount: 80 },
      { name: "Grace", initials: "GO", amount: 225 },
    ],
    totalRaised: 800,
    progress: 100,
    comments: 93,
    reactions: 187,
    timePosted: "4 days ago"
  },
  {
    id: "25",
    user: {
      name: "Erik Haaland",
      avatar: "/avatars/erik.png",
      initials: "EH",
    },
    prediction: "Erling Haaland will break the Premier League single-season goal record",
    punishmentTiers: [
      { minAmount: 20, name: "Mild", punishment: "Wear United jersey to Man City fan club meeting", color: "#3B82F6" },
      { minAmount: 50, name: "Medium", punishment: "Do robot dance celebration at office for a week", color: "#F59E0B" },
      { minAmount: 100, name: "Severe", punishment: "Play match in 'Not My GOAT' jersey and clown shoes, dramatically diving at all contact", color: "#EF4444" }
    ],
    currentTier: 0,
    stake: 20,
    deadline: "End of season",
    impliedOdds: 40,
    sportCategory: "Soccer",
    tags: ["Premier League", "Goals", "Record"],
    contributors: [
      { name: "Kevin", initials: "KD", amount: 10 },
      { name: "Phil", initials: "PF", amount: 5 },
    ],
    totalRaised: 15,
    progress: 15,
    comments: 64,
    reactions: 96,
    timePosted: "Yesterday"
  }
]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Sports")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filteredBets, setFilteredBets] = useState(browseBets)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [stakeRange, setStakeRange] = useState([0, 800])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("all")

  // Filter bets based on search, category, etc.
  useEffect(() => {
    let result = browseBets

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(bet => 
        bet.prediction.toLowerCase().includes(query) ||
        bet.user.name.toLowerCase().includes(query) ||
        bet.sportCategory.toLowerCase().includes(query) ||
        bet.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    if (selectedCategory !== "All Sports") {
      result = result.filter(bet => bet.sportCategory === selectedCategory)
    }

    if (selectedTags.length > 0) {
      result = result.filter(bet => 
        bet.tags.some(tag => selectedTags.includes(tag))
      )
    }

    result = result.filter(bet => 
      bet.stake >= stakeRange[0] && bet.stake <= stakeRange[1]
    )

    switch (sortBy) {
      case "newest":
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
                        defaultValue={[0, 800]} 
                        max={800} 
                        step={10}
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
                        setStakeRange([0, 800])
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
                        setStakeRange([0, 800])
                      }}
                    >
                      Reset Filters
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>

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

// Updated Bet interface
interface Bet {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  prediction: string;
  punishmentTiers: Array<{
    minAmount: number;
    name: string;
    punishment: string;
    color: string;
  }>;
  currentTier: number;
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
  const [contributionAmount, setContributionAmount] = useState(20)
  const [showContributionSlider, setShowContributionSlider] = useState(false)
  const [localTotalRaised, setLocalTotalRaised] = useState(bet.totalRaised)
  const [localProgress, setLocalProgress] = useState(bet.progress)
  const [localCurrentTier, setLocalCurrentTier] = useState(bet.currentTier)
  const [contributionMade, setContributionMade] = useState(false)
  const [contributionAnimation, setContributionAnimation] = useState(false)
  
  // Calculate next tier to unlock (if any)
  const getNextTierToUnlock = () => {
    if (localTotalRaised >= bet.punishmentTiers[2].minAmount) {
      return null
    }
    if (localTotalRaised >= bet.punishmentTiers[1].minAmount) return 2
    if (localTotalRaised >= bet.punishmentTiers[0].minAmount) return 1
    return 0
  }
  
  const nextTierIndex = getNextTierToUnlock()
  const nextTier = nextTierIndex !== null ? bet.punishmentTiers[nextTierIndex] : null
  const amountToNextTier = nextTier ? nextTier.minAmount - localTotalRaised : 0
  
  // Calculate progress percentage based on next tier goal, not total stake
  useEffect(() => {
    let progressValue = 0
    
    if (nextTierIndex === null) {
      progressValue = 100
    } else if (nextTierIndex === 0) {
      progressValue = (localTotalRaised / bet.punishmentTiers[0].minAmount) * 100
    } else if (nextTierIndex === 1) {
      progressValue = 33 + ((localTotalRaised - bet.punishmentTiers[0].minAmount) / 
        (bet.punishmentTiers[1].minAmount - bet.punishmentTiers[0].minAmount)) * 33
    } else if (nextTierIndex === 2) {
      progressValue = 67 + ((localTotalRaised - bet.punishmentTiers[1].minAmount) / 
        (bet.punishmentTiers[2].minAmount - bet.punishmentTiers[1].minAmount)) * 33
    }
    
    setLocalProgress(Math.min(100, Math.round(progressValue)))
    
    if (localTotalRaised >= bet.punishmentTiers[2].minAmount) {
      setLocalCurrentTier(2)
    } else if (localTotalRaised >= bet.punishmentTiers[1].minAmount) {
      setLocalCurrentTier(1)
    } else if (localTotalRaised >= bet.punishmentTiers[0].minAmount) {
      setLocalCurrentTier(0)
    }
  }, [localTotalRaised, bet.punishmentTiers, nextTierIndex])
  
  // Handle contribution submission
  const handleContribute = () => {
    const newTotal = localTotalRaised + contributionAmount
    
    setContributionAnimation(true)
    
    setTimeout(() => {
      setLocalTotalRaised(newTotal)
      setContributionMade(true)
      setShowContributionSlider(false)
      
      setTimeout(() => {
        setContributionAnimation(false)
      }, 1500)
    }, 300)
  }
  
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
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-1"
              >
                <Badge variant="outline" className="bg-white text-blue-600 font-medium flex items-center gap-1 h-6">
                  <span className="text-xs opacity-70">Min Payout:</span> ${bet.stake}
                </Badge>
              </motion.div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button variant="outline" size="sm" className="h-8 px-2">
                <Star className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="space-y-4">
          <div>
            <div className="flex items-start gap-2 mb-2">
              <motion.div 
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mt-0.5"
                whileHover={{ scale: 1.1, backgroundColor: "#DBEAFE" }}
              />
              <p className="font-medium flex-1">{bet.prediction}</p>
            </div>
          </div>
          
          {/* Punishment Tiers Wheel Visualization */}
          <div className="relative bg-gray-50 rounded-xl p-3 border border-gray-100">
            {contributionAnimation && (
              <>
                {Array.from({ length: 30 }).map((_, i) => {
                  const randomLeft = Math.random() * 100
                  const randomDelay = Math.random() * 0.5
                  const colors = ["#EF4444", "#3B82F6", "#F59E0B", "#10B981", "#8B5CF6"]
                  const randomColor = colors[Math.floor(Math.random() * colors.length)]
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute z-10 rounded-full w-2 h-2"
                      style={{ 
                        left: `${randomLeft}%`, 
                        top: '50%',
                        backgroundColor: randomColor 
                      }}
                      initial={{ y: 0, opacity: 1 }}
                      animate={{
                        y: [0, -(Math.random() * 150 + 50)],
                        x: [0, (Math.random() * 100 - 50)],
                        opacity: [1, 1, 0],
                        scale: [0, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: randomDelay,
                        ease: "easeOut"
                      }}
                    />
                  )
                })}
              </>
            )}
          
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Punishment Tiers</h3>
            
            <div className="relative flex items-center justify-between mb-3 pt-1">
              {bet.punishmentTiers.map((tier, index) => {
                const isActive = localTotalRaised >= tier.minAmount
                const isCurrentTier = index === localCurrentTier
                
                return (
                  <div key={index} className="relative flex flex-col items-center" style={{ width: '30%' }}>
                    <motion.div 
                      className={`w-full h-2 rounded-full ${isActive ? 'opacity-100' : 'opacity-40'}`}
                      style={{ backgroundColor: tier.color }}
                      whileHover={{ scale: 1.05 }}
                    />
                    
                    <motion.div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 ${isActive ? 'shadow-md' : 'opacity-50'} ${isCurrentTier ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                      style={{ backgroundColor: tier.color }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      animate={isCurrentTier ? { 
                        scale: [1, 1.05, 1], 
                        boxShadow: [
                          '0 0 0 rgba(0,0,0,0)', 
                          `0 0 8px ${tier.color}`, 
                          '0 0 0 rgba(0,0,0,0)'
                        ],
                        transition: { repeat: Infinity, duration: 2 } 
                      } : {}}
                    >
                      <span className="text-xs font-bold text-white">${tier.minAmount}</span>
                    </motion.div>
                    
                    <span className={`text-xs font-medium mt-1 ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                      {tier.name}
                    </span>
                  </div>
                )
              })}
              
              <div className="absolute top-[9px] left-0 h-2 bg-gray-200 w-full -z-10 rounded-full" />
              <motion.div 
                className="absolute top-[9px] left-0 h-2 bg-gradient-to-r from-blue-500 via-amber-500 to-red-500 rounded-full -z-5"
                initial={{ width: "0%" }}
                animate={{ width: `${localProgress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            
            <motion.div 
              className={`p-3 rounded-lg mb-2 text-white relative overflow-hidden`}
              style={{ 
                backgroundColor: bet.punishmentTiers[localCurrentTier].color,
                boxShadow: `0 4px 12px ${bet.punishmentTiers[localCurrentTier].color}40`
              }}
              animate={contributionAnimation && { 
                scale: [1, 1.03, 1],
                boxShadow: [
                  `0 4px 12px ${bet.punishmentTiers[localCurrentTier].color}40`,
                  `0 8px 24px ${bet.punishmentTiers[localCurrentTier].color}70`,
                  `0 4px 12px ${bet.punishmentTiers[localCurrentTier].color}40`
                ],
                transition: { repeat: 3, duration: 0.7 }
              }}
            >
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#smallGrid)" />
                </svg>
              </div>

              <div className="flex justify-between items-start relative">
                <div className="flex-1">
                  <p className="text-xs font-semibold mb-1 uppercase tracking-wider">Current Punishment:</p>
                  <p className="text-sm font-medium">{bet.punishmentTiers[localCurrentTier].punishment}</p>
                </div>
                
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Badge className="bg-white/90 text-gray-800 font-bold shadow-md">
                    {bet.punishmentTiers[localCurrentTier].name}
                  </Badge>
                </motion.div>
              </div>
            </motion.div>
            
            {!nextTier && localTotalRaised >= bet.punishmentTiers[2].minAmount && (
              <motion.div 
                className="text-center p-3 border-2 border-purple-300 bg-purple-50 rounded-lg text-sm"
                whileHover={{ scale: 1.02, borderColor: '#a855f7' }}
                animate={{ 
                  boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 12px rgba(168, 85, 247, 0.4)', '0 0 0 rgba(0,0,0,0)']
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="relative">
                    <motion.div 
                      className="absolute inset-0 bg-purple-400 rounded-full opacity-20"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.3, 0.2] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <div className="h-6 w-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">∞</span>
                    </div>
                  </div>
                  <p className="text-purple-800 font-medium">
                    <span className="font-bold">${localTotalRaised - bet.punishmentTiers[2].minAmount}</span> beyond max tier! <span className="text-purple-600">Keep pushing the limits!</span>
                  </p>
                </div>
              </motion.div>
            )}

            {nextTier && (
              <motion.div 
                className="text-center p-3 border-2 border-dashed rounded-lg text-sm relative overflow-hidden"
                style={{ borderColor: `${nextTier.color}70` }}
                whileHover={{ scale: 1.02, borderColor: nextTier.color }}
                animate={{ 
                  boxShadow: ['0 0 0 rgba(0,0,0,0)', `0 0 12px ${nextTier.color}40`, '0 0 0 rgba(0,0,0,0)']
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div 
                  className="absolute inset-0 opacity-10" 
                  style={{ background: `linear-gradient(45deg, transparent, ${nextTier.color})` }}
                />
                
                <div className="flex items-center justify-center gap-2 relative">
                  <motion.div
                    className="h-6 w-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: nextTier.color }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: ['0 0 0 rgba(0,0,0,0)', `0 0 10px ${nextTier.color}80`, '0 0 0 rgba(0,0,0,0)']
                    }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <span className="text-xs font-bold text-white">
                      {nextTierIndex === 1 ? 'M' : nextTierIndex === 2 ? 'S' : 'L'}
                    </span>
                  </motion.div>
                  
                  <p className="text-gray-700">
                    <span className="font-semibold">${amountToNextTier} more</span> unlocks 
                    <span className="font-bold ml-1" style={{color: nextTier.color}}>
                      {nextTier.name} Tier: 
                    </span>
                    <span className="italic ml-1">{nextTier.punishment}</span>
                  </p>
                </div>
              </motion.div>
            )}
          </div>

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
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <motion.div 
                  className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Check className="h-2.5 w-2.5 text-white" />
                </motion.div>
                <span>Current Total: <span className="font-bold text-blue-600">${localTotalRaised}</span></span>
              </div>
              
              {nextTier ? (
                <span className="font-medium flex items-center gap-1">
                  <motion.div 
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: nextTier.color }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <span>${amountToNextTier} to {nextTier.name}</span>
                </span>
              ) : (
                <span className="font-medium text-purple-600 flex items-center gap-1">
                  <motion.div 
                    className="h-3 w-3 rounded-full bg-purple-500"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  All tiers unlocked!
                </span>
              )}
            </div>
            
            <div className="relative">
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  className="h-full rounded-full relative"
                  style={{ 
                    background: `linear-gradient(to right, ${bet.punishmentTiers[0].color}, ${bet.punishmentTiers[1].color}, ${bet.punishmentTiers[2].color}, #A855F7)` 
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${localProgress}%` }}
                  transition={{ duration: 1 }}
                >
                  <motion.div 
                    className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg]"
                    animate={{ 
                      x: ['-100%', '200%'],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatDelay: 2,
                      duration: 1.5
                    }}
                    style={{ display: localProgress > 0 ? 'block' : 'none' }}
                  />
                </motion.div>
              </div>
              
              {bet.punishmentTiers.map((tier, idx) => {
                const position = idx === 0 ? 33 : idx === 1 ? 67 : 100
                const isActive = localTotalRaised >= tier.minAmount
                
                return (
                  <motion.div 
                    key={idx}
                    className={`absolute w-2 h-6 -mt-5 rounded-full ${isActive ? 'opacity-100' : 'opacity-40'}`}
                    style={{ 
                      left: `${position}%`, 
                      marginLeft: '-4px',
                      backgroundColor: tier.color,
                      boxShadow: isActive ? `0 0 8px ${tier.color}` : 'none'
                    }}
                    animate={isActive ? {
                      height: ['24px', '28px', '24px'],
                      boxShadow: ['0 0 5px rgba(0,0,0,0.2)', `0 0 10px ${tier.color}`, '0 0 5px rgba(0,0,0,0.2)']
                    } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )
              })}
            </div>
            
            <div className="flex items-center justify-between mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div>
                <span className="text-xs text-gray-500 block mb-2">Contributors:</span>
                <div className="flex -space-x-2">
                  {bet.contributors.map((contributor, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 10,
                        delay: i * 0.1 
                      }}
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8 border-2 border-white">
                          <AvatarFallback className="text-xs">{contributor.initials}</AvatarFallback>
                        </Avatar>
                        
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full px-1 border border-white shadow-sm">
                          ${contributor.amount}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {contributionMade && (
                    <motion.div 
                      initial={{ scale: 0, x: 20 }}
                      animate={{ scale: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8 border-2 border-blue-200">
                          <AvatarFallback className="text-xs bg-blue-500 text-white">YO</AvatarFallback>
                        </Avatar>
                        
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] rounded-full px-1 border border-white shadow-sm">
                          ${contributionAmount}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600"
                    whileHover={{ scale: 1.2, backgroundColor: "#E0F2FE", zIndex: 10 }}
                  >
                    +
                  </motion.div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <motion.span 
                  className="flex flex-col items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-sm font-medium text-blue-600">{bet.comments}</span>
                  <span className="text-xs text-gray-500">Comments</span>
                </motion.span>
                <motion.span 
                  className="flex flex-col items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-sm font-medium text-red-500">{bet.reactions}</span>
                  <span className="text-xs text-gray-500">Reactions</span>
                </motion.span>
              </div>
            </div>
          </div>
          
          {showContributionSlider && (
            <div className="mt-4">
              <motion.div 
                className="space-y-4 bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100 shadow-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex justify-between items-center">
                  <motion.div 
                    className="text-lg font-bold text-blue-700 flex items-center gap-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <span className="text-2xl">${contributionAmount}</span>
                  </motion.div>
                  
                  <div className="space-y-1">
                    {nextTier && contributionAmount < amountToNextTier && (
                      <span className="text-amber-600 text-xs flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
                        <motion.div 
                          animate={{ x: [0, 3, 0] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        >
                          <span>→</span>
                        </motion.div>
                        ${amountToNextTier - contributionAmount} more to unlock {nextTier.name}
                      </span>
                    )}
                    
                    {nextTier && contributionAmount >= amountToNextTier && (
                      <motion.span 
                        className="text-green-600 text-xs flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full"
                        animate={{ 
                          backgroundColor: ['rgba(240, 253, 244, 1)', 'rgba(220, 252, 231, 1)', 'rgba(240, 253, 244, 1)'],
                          boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 6px rgba(34, 197, 94, 0.3)', '0 0 0 rgba(0,0,0,0)']
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Check className="h-3 w-3 mr-1" /> Will unlock {nextTier.name}!
                      </motion.span>
                    )}
                    
                    {!nextTier && (
                      <motion.span 
                        className="text-purple-600 text-xs flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded-full"
                        animate={{ 
                          backgroundColor: ['rgba(245, 243, 255, 1)', 'rgba(237, 233, 254, 1)', 'rgba(245, 243, 255, 1)'],
                          boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 6px rgba(147, 51, 234, 0.3)', '0 0 0 rgba(0,0,0,0)']
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <span className="text-sm">∞</span> Pushing beyond max tier!
                      </motion.span>
                    )}
                  </div>
                </div>
                
                <div className="relative mt-8 pt-6">
                  <div className="absolute top-0 left-0 right-0 flex justify-between px-2">
                    <motion.div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: bet.punishmentTiers[0].color }}
                      whileHover={{ scale: 1.2, y: -2 }}
                    >
                      <span className="text-xs font-bold text-white">L</span>
                    </motion.div>
                    
                    <motion.div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: bet.punishmentTiers[1].color }}
                      whileHover={{ scale: 1.2, y: -2 }}
                    >
                      <span className="text-xs font-bold text-white">M</span>
                    </motion.div>
                    
                    <motion.div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: bet.punishmentTiers[2].color }}
                      whileHover={{ scale: 1.2, y: -2 }}
                    >
                      <span className="text-xs font-bold text-white">S</span>
                    </motion.div>
                    
                    <motion.div 
                      className="w-6 h-6 rounded-full flex items-center justify-center bg-purple-500"
                      whileHover={{ scale: 1.2, y: -2 }}
                    >
                      <span className="text-xs font-bold text-white">∞</span>
                    </motion.div>
                  </div>
                  
                  <div className="relative">
                    <Slider 
                      min={5}
                      max={300}
                      step={5}
                      value={[contributionAmount]}
                      onValueChange={(value) => setContributionAmount(value[0])}
                      className="pt-1"
                    />
                    
                    {bet.punishmentTiers.map((tier, i) => {
                      const percentage = Math.min(100, (tier.minAmount / 300) * 100)
                      return (
                        <motion.div
                          key={i}
                          className="absolute bottom-0 w-1 h-8 rounded-full"
                          style={{ 
                            left: `${percentage}%`,
                            backgroundColor: tier.color,
                            marginLeft: '-2px'
                          }}
                          animate={{ 
                            height: ['32px', '36px', '32px'],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                        />
                      )
                    })}
                    
                    <motion.div
                      className="absolute -top-4 rounded-full w-8 h-8 shadow-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ 
                        left: `${Math.min(100, (contributionAmount / 300) * 100)}%`,
                        marginLeft: '-16px',
                        backgroundColor: nextTier ? nextTier.color : '#A855F7',
                        background: nextTier 
                          ? `radial-gradient(circle, ${nextTier.color} 0%, ${nextTier.color}dd 70%, ${nextTier.color}aa 100%)`
                          : 'radial-gradient(circle, #A855F7 0%, #A855F7dd 70%, #A855F7aa 100%)',
                        boxShadow: nextTier 
                          ? `0 0 10px ${nextTier.color}80`
                          : '0 0 10px rgba(168, 85, 247, 0.5)'
                      }}
                      animate={{ 
                        y: [0, -3, 0],
                        boxShadow: nextTier 
                          ? [
                              `0 0 5px ${nextTier.color}50`,
                              `0 0 15px ${nextTier.color}80`,
                              `0 0 5px ${nextTier.color}50`
                            ]
                          : [
                              '0 0 5px rgba(168, 85, 247, 0.3)',
                              '0 0 15px rgba(168, 85, 247, 0.6)',
                              '0 0 5px rgba(168, 85, 247, 0.3)'
                            ]
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      ${contributionAmount}
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-between text-xs mt-8">
                    <span 
                      className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium"
                      style={{ backgroundColor: `${bet.punishmentTiers[0].color}20`, color: bet.punishmentTiers[0].color }}
                    >
                      ${bet.punishmentTiers[0].minAmount} - {bet.punishmentTiers[0].name}
                    </span>
                    <span 
                      className="px-2 py-1 rounded bg-amber-100 text-amber-700 font-medium"
                      style={{ backgroundColor: `${bet.punishmentTiers[1].color}20`, color: bet.punishmentTiers[1].color }}
                    >
                      ${bet.punishmentTiers[1].minAmount} - {bet.punishmentTiers[1].name}
                    </span>
                    <span 
                      className="px-2 py-1 rounded bg-red-100 text-red-700 font-medium"
                      style={{ backgroundColor: `${bet.punishmentTiers[2].color}20`, color: bet.punishmentTiers[2].color }}
                    >
                      ${bet.punishmentTiers[2].minAmount}+ - {bet.punishmentTiers[2].name}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="text-sm font-medium text-gray-700">Quick amounts:</div>
                  <div className="flex flex-wrap gap-2">
                    {[10, 25, 50, 100, 200].map((amount) => (
                      <motion.button
                        key={amount}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          contributionAmount === amount 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setContributionAmount(amount)}
                      >
                        ${amount}
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-sm text-gray-700">Custom amount:</span>
                    <Input
                      type="number"
                      min="5"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(Number(e.target.value))}
                      className="h-9 w-32"
                    />
                  </div>
                </div>
              </motion.div>
              
              <div className="flex gap-2 pt-2">
                <motion.div className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full border-2" 
                    onClick={() => setShowContributionSlider(false)}
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleContribute}
                  >
                    {nextTier && contributionAmount >= amountToNextTier ? (
                      <span className="flex items-center gap-1">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 10, 0] }}
                          transition={{ repeat: Infinity, repeatDelay: 1, duration: 0.5 }}
                        >
                          🔓
                        </motion.div>
                        Unlock {nextTier.name}!
                      </span>
                    ) : (
                      <span>Confirm ${contributionAmount}</span>
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-1 pb-4 flex-col items-stretch gap-3 mt-auto">
        {!showContributionSlider && (
          <motion.div 
            className="flex-1"
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowContributionSlider(true)}
            >
              {nextTier ? (
                <>Join & Unlock {nextTier.name} Tier (${amountToNextTier} more)</>
              ) : (
                <>Contribute & Raise the Stakes!</>
              )}
            </Button>
          </motion.div>
        )}
      </CardFooter>
    </Card>
  )
}