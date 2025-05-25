"use client";

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useProfile } from "@/hooks/useProfile";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import LoadingSpinner from "@/components/ui/loading-spinner";

// Lazy loading de componentes pesados
const OverviewTab = lazy(() => import("./components/tabs/OverviewTab"));
const PersonalInfoTab = lazy(() => import("./components/tabs/PersonalInfoTab"));
const MyEventsTab = lazy(() => import("./components/tabs/MyEventsTab"));
const TicketsTab = lazy(() => import("./components/tabs/TicketsTab"));
const PreferencesTab = lazy(() => import("./components/tabs/PreferencesTab"));

// Mock data
const upcomingEvents = [
  {
    id: 1,
    name: "Festival Internacional de Música",
    description:
      "El evento musical más grande del año con artistas internacionales.",
    date: "24 Jun 2024",
    time: "20:00",
    location: "Parque Central, La Habana",
    image: "/images/events/music-festival.jpg",
    categories: ["Música", "Festival"],
    state: "Próximamente",
    price: 150,
    attendees: 2500,
  },
  {
    id: 2,
    name: "Conferencia de Tecnología",
    description:
      "Ponentes de empresas tecnológicas compartirán las últimas tendencias.",
    date: "15 Jul 2024",
    time: "09:00",
    location: "Centro de Convenciones, Varadero",
    image: "/images/events/tech-conference.jpeg",
    categories: ["Tecnología", "Conferencia"],
    state: "Próximamente",
    price: 80,
    attendees: 500,
  },
];

const userStats = {
  eventsAttended: 24,
  favoriteEvents: 12,
  totalSpent: 2850,
  memberSince: "Mayo 2023",
  profileViews: 1247,
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function ProfilePage() {
  const {
    session,
    status,
    activeTab,
    setActiveTab,
    editMode,
    setEditMode,
    isLoading,
    ticketFilter,
    setTicketFilter,
    searchTerm,
    setSearchTerm,
    userData,
    notifications,
    setNotifications,
    handleSaveProfile,
    handleInputChange,
    handleLogout,
    toggleInterest,
  } = useProfile();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <ProfileHeader
        session={session}
        userData={userData}
        userStats={userStats}
        onEditClick={() => setEditMode(true)}
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <TabsContent value="overview" className="mt-0">
                <OverviewTab
                  upcomingEvents={upcomingEvents}
                  userStats={userStats}
                />
              </TabsContent>

              <TabsContent value="personal-info" className="mt-0">
                <PersonalInfoTab
                  userData={userData}
                  editMode={editMode}
                  isLoading={isLoading}
                  onInputChange={handleInputChange}
                  onSave={handleSaveProfile}
                  onEditToggle={() => setEditMode(!editMode)}
                  onToggleInterest={toggleInterest}
                />
              </TabsContent>

              <TabsContent value="my-events" className="mt-0">
                <MyEventsTab upcomingEvents={upcomingEvents} />
              </TabsContent>

              <TabsContent value="tickets" className="mt-0">
                <TicketsTab
                  ticketFilter={ticketFilter}
                  setTicketFilter={setTicketFilter}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </TabsContent>

              <TabsContent value="preferences" className="mt-0">
                <PreferencesTab
                  notifications={notifications}
                  setNotifications={setNotifications}
                  userInterests={userData.interests}
                  onToggleInterest={toggleInterest}
                />
              </TabsContent>
            </Suspense>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}
