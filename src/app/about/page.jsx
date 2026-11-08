import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Users,
  Target,
  ShieldCheck,
  ArrowRight,
  CalendarPlus,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";

export const metadata = { title: "About Us" };

const VALUES = [
  {
    icon: Heart,
    tone: "bg-orange-100 dark:bg-orange-950/60 text-[#f07b42]",
    title: "Community First",
    description:
      "Every event and initiative on our platform is designed to bring positive change and social impact to local neighborhoods.",
  },
  {
    icon: Users,
    tone: "bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400",
    title: "Inclusive Collaboration",
    description:
      "We foster an open environment where volunteers, organizers, and partners work hand in hand without barriers.",
  },
  {
    icon: Target,
    tone: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
    title: "Action-Oriented Impact",
    description:
      "From food drives to cleanups, we measure success by the tangible good done in real-world communities.",
  },
  {
    icon: ShieldCheck,
    tone: "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
    title: "Transparency & Trust",
    description:
      "Full operational transparency for all events, registration updates, and organizer credentials.",
  },
];

const STEPS = [
  {
    icon: CalendarPlus,
    title: "Create or Find an Event",
    description:
      "Organize your own initiative in a few minutes, or browse upcoming events happening around you.",
  },
  {
    icon: UserPlus,
    title: "Join with One Click",
    description:
      "Pick an event that matters to you and register to volunteer. You can leave at any time.",
  },
  {
    icon: LayoutDashboard,
    title: "Track Everything",
    description:
      "Manage the events you created and see every event you joined from your personal dashboard.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b3c3d] via-[#0f5557] to-[#072425] text-white">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#f07b42]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 py-20 sm:py-24 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="text-[#f07b42]" /> Our Mission &
            Vision
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider leading-tight">
            Connecting Hearts to Empower Communities
          </h1>
          <p className="text-emerald-50/80 text-sm sm:text-base leading-relaxed">
            Hermione Community Events is a digital movement bridging passionate
            volunteers with meaningful civic initiatives, charity drives, and
            environmental projects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] text-white px-7 py-3.5 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
            >
              Explore Events <ArrowRight size={15} />
            </Link>
            <Link
              href="/events/create"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-7 py-3.5 rounded-2xl font-bold uppercase text-xs tracking-wider transition-colors"
            >
              Create an Event
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative">
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800"
                alt="Community volunteers working together"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xs bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl p-5 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#f07b42] flex items-center justify-center shrink-0">
                <Heart size={18} />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Every great community project starts with one person who cares
                enough to act.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-6 lg:pt-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
              Building Stronger Neighborhoods Together
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Founded with the belief that small collective actions create
              monumental social shifts, our platform provides community leaders
              with intuitive tools to manage events while enabling participants
              to easily find and join nearby drives.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Whether it’s tree plantation drives, winter relief distribution,
              or youth education workshops, we empower every individual to take
              part in positive change.
            </p>
            <div className="pt-2">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-6 py-3 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-md transition-all"
              >
                Explore Events <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Making a difference takes three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4"
              >
                <span className="absolute top-5 right-6 text-5xl font-extrabold text-gray-100 dark:text-gray-800 select-none">
                  {index + 1}
                </span>
                <div className="relative w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400 flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <h3 className="relative text-base font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="relative text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Core values */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
              Our Core Principles
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              The foundational values guiding every feature and community
              initiative.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, tone, title, description }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tone}`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b3c3d] to-[#072425] text-white p-8 sm:p-12 text-center shadow-lg">
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#f07b42]/25 blur-3xl" />
          <div className="relative space-y-4 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider">
              Ready to Make a Difference?
            </h2>
            <p className="text-sm text-emerald-50/80 leading-relaxed">
              Join a community event today or start your own initiative and
              bring your neighbors together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] text-white px-7 py-3.5 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
              >
                Find an Event <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-7 py-3.5 rounded-2xl font-bold uppercase text-xs tracking-wider transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
