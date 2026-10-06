
import {
  ShieldCheck,
  Lock,
  MessageCircle,
  UserRound,
  Database,
  Cookie,
  Share2,
  Trash2,
  RefreshCw,
  Mail,
} from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content:
      "When you create an account, we may collect information such as your name, email address, profile photo, and other information you choose to provide. We also collect information required to operate and improve our services.",
  },
  {
    icon: MessageCircle,
    title: "Messages & Conversations",
    content:
      "Your messages are used to provide the chat experience. We may store messages and conversation data so that you can access your conversations across sessions and devices. We do not sell your private conversations to advertisers.",
  },
  {
    icon: UserRound,
    title: "Account & Profile",
    content:
      "You are responsible for keeping your account information accurate. You can update certain profile information from your account settings. You should also protect your login credentials and avoid sharing them with others.",
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content:
      "We use collected information to provide chat functionality, authenticate users, maintain sessions, improve application performance, prevent abuse, provide support, and maintain the security of our platform.",
  },
  {
    icon: Cookie,
    title: "Cookies & Storage",
    content:
      "We may use cookies, local storage, or similar technologies to maintain authentication sessions, remember preferences, improve functionality, and provide a better experience.",
  },
  {
    icon: ShieldCheck,
    title: "Data Security",
    content:
      "We use reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no online service can guarantee complete security.",
  },
  {
    icon: Share2,
    title: "Data Sharing",
    content:
      "We do not sell your personal information. Information may be shared with trusted service providers when necessary to operate our application, comply with legal requirements, protect our users, or prevent fraud and abuse.",
  },
  {
    icon: Trash2,
    title: "Account Deletion",
    content:
      "You may request deletion of your account and associated information. Some information may need to be retained for legal, security, fraud-prevention, or legitimate business purposes where required.",
  },
  {
    icon: RefreshCw,
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. When significant changes are made, we will provide an appropriate notice through the application or other available communication channels.",
  },
];

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-gray-900">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100">
              <ShieldCheck className="h-6 w-6 text-green-600" />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-green-600">
                Privacy & Security
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Privacy Policy
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Your privacy matters to us. This policy explains what
                information we collect, how we use it, and how we protect
                your data while using our ChatApp.
              </p>

              <p className="mt-4 text-xs text-gray-400">
                Last updated: October 6, 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="mb-8 rounded-2xl border border-green-100 bg-green-50/70 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-gray-900">
            Your privacy, our responsibility
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            We designed ChatApp with privacy and security in mind. This
            Privacy Policy describes how we handle information when you use
            our application, communicate with other users, and manage your
            account.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.title}
                className="
                  rounded-2xl border border-gray-200
                  bg-white p-5 sm:p-6
                  transition-shadow
                  hover:shadow-sm
                "
              >
                <div className="flex gap-4">
                  <div
                    className="
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-xl bg-gray-100
                    "
                  >
                    <Icon className="h-[18px] w-[18px] text-gray-600" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                      {section.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {section.content}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* User Rights */}
        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
              <UserRound className="h-[18px] w-[18px] text-gray-600" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                Your Privacy Rights
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Depending on your location and applicable law, you may have
                rights to access, correct, update, export, or delete certain
                personal information associated with your account.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>• Access information associated with your account.</li>
                <li>• Update or correct inaccurate profile information.</li>
                <li>• Request deletion of your account and eligible data.</li>
                <li>• Request information about how your data is processed.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
              <Mail className="h-[18px] w-[18px] text-green-600" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                Contact Us
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                If you have questions about this Privacy Policy or want to
                make a privacy-related request, please contact our support
                team.
              </p>

              <a
                href="mailto:privacy@yourchatapp.com"
                className="
                  mt-3 inline-flex items-center
                  text-sm font-medium
                  text-green-600
                  hover:text-green-700
                "
              >
                privacy@yourchatapp.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="py-8 text-center">
          <p className="text-xs text-gray-400">
            By using ChatApp, you acknowledge that you have read and
            understood this Privacy Policy.
          </p>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
