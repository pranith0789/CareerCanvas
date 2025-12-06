// "use client";

// import { useRouter, usePathname } from "next/navigation";
// import { SquarePen, LogOut } from "lucide-react";

// export default function Navbar({ sections, companyId, activeSection }: any) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const orderedSections = [...sections].sort(
//     (a: any, b: any) => (a.position ?? 0) - (b.position ?? 0)
//   );

//   // Scroll or redirect
//   const scrollToSection = (id: string) => {
//     const isCareersPage = pathname.includes("/careers");

//     if (isCareersPage) {
//       router.push(`/company/${companyId}#${id}`);
//       return;
//     }

//     const el = document.getElementById(id);
//     if (el) {
//       window.scrollTo({
//         top: el.offsetTop - 90,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleLogout = async () => {
//   await fetch("/api/logout", { method: "POST" });
//   router.push("/auth/login");
//   };


//   return (
//     <nav className="fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md shadow-sm z-[999]">
//       <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-6">

//         {/* LEFT SIDE — NAV LINKS */}
//         <ul className="flex items-center gap-8">
//           {orderedSections
//             .filter((s: any) => s.id !== "careers")
//             .map((sec: any) => (
//               <li key={sec.id}>
//                 <button
//                   onClick={() => scrollToSection(sec.id)}
//                   className={`
//                     relative font-medium tracking-wide transition text-sm
//                     ${activeSection === sec.id
//                       ? "text-blue-600"
//                       : "text-gray-600 hover:text-blue-600"}
//                   `}
//                 >
//                   {sec.label.toUpperCase()}

//                   {/* Underline Animation */}
//                   <span
//                     className={`
//                       absolute left-0 bottom-[-4px] h-[2px] w-full rounded-full bg-blue-600 transition-all 
//                       ${activeSection === sec.id ? "opacity-100" : "opacity-0"}
//                     `}
//                   />
//                 </button>
//               </li>
//             ))}
//         </ul>

//         {/* RIGHT SIDE — Careers + Edit + Logout */}
//         <div className="flex items-center gap-6 ml-auto">

//           {/* Careers (Right-Aligned Special Tab) */}
//           <a
//             href={`/company/${companyId}/careers`}
//             className={`
//               relative font-medium text-sm tracking-wide transition
//               ${pathname.includes("/careers")
//                 ? "text-blue-600"
//                 : "text-gray-600 hover:text-blue-600"}
//             `}
//           >
//             CAREERS

//             {/* Underline Animation */}
//             <span
//               className={`
//                 absolute left-0 bottom-[-4px] h-[2px] w-full rounded-full bg-blue-600 transition-all
//                 ${pathname.includes("/careers") ? "opacity-100" : "opacity-0"}
//               `}
//             />
//           </a>

//           {/* Edit Button */}
//           <button
//             onClick={() => router.push(`/company/${companyId}/edit`)}
//             className="p-2 rounded-md hover:bg-gray-100 transition"
//             title="Edit Company Page"
//           >
//             <SquarePen size={20} className="text-gray-600 hover:text-blue-600" />
//           </button>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="p-2 rounded-md hover:bg-red-50 transition"
//             title="Logout"
//           >
//             <LogOut size={22} className="text-gray-600 hover:text-red-600" />
//           </button>

//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SquarePen, LogOut, Menu, X } from "lucide-react";

export default function Navbar({ sections, companyId, activeSection }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const orderedSections = [...sections].sort(
    (a: any, b: any) => (a.position ?? 0) - (b.position ?? 0)
  );

  const isCareersPage = pathname.includes("/careers");

  const scrollToSection = (id: string) => {
    if (isCareersPage) {
      router.push(`/company/${companyId}#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/auth/login");
  };

  return (
    <nav className="fixed top-0 left-0 z-[999] w-full bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <ul className="flex items-center gap-8 min-w-max">
            {orderedSections
              .filter((s: any) => s.id !== "careers")
              .map((sec: any) => (
                <li key={sec.id} className="inline-block">
                  <button
                    onClick={() => scrollToSection(sec.id)}
                    className={`
                      relative font-medium tracking-wide transition text-sm whitespace-nowrap
                      ${
                        activeSection === sec.id
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-600"
                      }
                    `}
                  >
                    {sec.label.toUpperCase()}
                    <span
                      className={`
                        absolute left-0 bottom-[-4px] h-[2px] w-full bg-blue-600 rounded-full transition-all
                        ${activeSection === sec.id ? "opacity-100" : "opacity-0"}
                      `}
                    />
                  </button>
                </li>
              ))}
          </ul>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="hidden md:flex items-center gap-6 ml-auto">

          {/* Careers */}
          <a
            href={`/company/${companyId}/careers`}
            className={`
              relative font-medium text-sm tracking-wide transition
              ${
                pathname.includes("/careers")
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }
            `}
          >
            CAREERS
            <span
              className={`
                absolute left-0 bottom-[-4px] h-[2px] w-full bg-blue-600 rounded-full transition-all
                ${pathname.includes("/careers") ? "opacity-100" : "opacity-0"}
              `}
            />
          </a>

          {/* Edit */}
          <button
            onClick={() => router.push(`/company/${companyId}/edit`)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
            title="Edit Company Page"
          >
            <SquarePen size={20} className="text-gray-700 hover:text-blue-600" />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-md hover:bg-red-50 transition"
            title="Logout"
          >
            <LogOut size={22} className="text-gray-700 hover:text-red-600" />
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-inner px-6 py-4 space-y-4">

          {/* SECTION LINKS */}
          <div className="flex flex-col gap-3">
            {orderedSections
              .filter((s: any) => s.id !== "careers")
              .map((sec: any) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    scrollToSection(sec.id);
                    setMobileOpen(false);
                  }}
                  className={`
                    text-left font-medium transition
                    ${
                      activeSection === sec.id
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }
                  `}
                >
                  {sec.label.toUpperCase()}
                </button>
              ))}
          </div>

          <hr className="border-gray-200" />

          {/* Careers */}
          <a
            href={`/company/${companyId}/careers`}
            onClick={() => setMobileOpen(false)}
            className={`
              block font-medium
              ${
                pathname.includes("/careers")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }
            `}
          >
            Careers
          </a>

          {/* Edit + Logout */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              onClick={() => {
                router.push(`/company/${companyId}/edit`);
                setMobileOpen(false);
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <SquarePen size={20} /> Edit
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
