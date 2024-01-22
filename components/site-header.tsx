"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import i18next from "i18next"
import { Trans } from "react-i18next/TransWithoutContext"

import { cn } from "@/lib/utils"
import { MainNav, MainNavProps } from "@/components/main-nav"
import { useTranslation } from "@/app/i18n/client"
import { LanguageMapping, LocaleTypes } from "@/app/i18n/settings"

import { Icons } from "./icons"
import { SiteHeaderMobile } from "./site-header-mobile"
import { Dropdown } from "./ui/dropdown"

type SiteHeaderProps = {
  lang: LocaleTypes
}

export function SiteHeader({ lang }: SiteHeaderProps) {
  const { t: i18n } = useTranslation(lang, "common")
  const MAIN_NAV: MainNavProps["items"] = [
    {
      title: i18n("menu.home"),
      href: `/${lang}`,
    },
    {
      title: i18n("menu.projectLibrary"),
      href: `/${lang}/projects`,
    },
    {
      title: i18n("menu.about"),
      href: `/${lang}/about`,
    },
    {
      title: i18n("menu.resources"),
      href: `/${lang}/resources`,
    },
  ]

  const languagesItems: { label: string; value: string }[] =
    Object.entries(LanguageMapping).map(([value, label]) => {
      return {
        label,
        value,
      }
    }) ?? []

  return (
    <header className="sticky top-0 z-40 w-full bg-white px-6 shadow-sm xl:px-20">
      <div className="flex h-16 items-center justify-between space-x-4 sm:space-x-0">
        <MainNav items={MAIN_NAV} lang={lang} />
        <SiteHeaderMobile lang={lang} />
        <div className="hidden outline-none md:block">
          <Dropdown
            label={
              <div className="flex items-center gap-1">
                <Icons.globe size={22} />
                <span className="!text-base !font-normal text-tuatara-950">
                  {LanguageMapping[lang] ?? LanguageMapping["en"]}
                </span>
              </div>
            }
            defaultItem={lang}
            items={languagesItems}
            onChange={(lang) => {
              console.log(lang)
              window?.location?.replace(`/${lang}`)
            }}
          />
        </div>
      </div>
    </header>
  )
}
