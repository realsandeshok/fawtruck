'use client'

import { useState } from 'react'
import { Sidebar } from './dashcomp/sidebar'
import { Header } from './dashcomp/header'
import { PageSections } from './dashcomp/page-sections'
import { CreateSectionForm } from './dashcomp/create-section-form'
import { ThemeProvider } from "./dashcomp/theme-provider"

interface Section {
  id: number;
  title?: string;
  content?: string;
  image?: string | null;
}

interface Sections {
  [key: string]: Section[];
}

export default function Dashboard() {
  const [activePage, setActivePage] = useState<string>('Banner')
  const [sections, setSections] = useState<Sections>({
    Banner: [{ id: 1, image: null }],
    Card: [{ id: 1, title: 'Card 1', content: 'Card content...', image: null }],
    'About Us': [{ id: 1, title: 'About Us', content: 'Company description...' }]
  })

  const handleCreateSection = (newSection: Section) => {
    setSections(prevSections => ({
      ...prevSections,
      [activePage]: [...prevSections[activePage], { id: Date.now(), ...newSection }]
    }))
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar setActivePage={setActivePage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header activePage={activePage} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-6 py-8">
              <h3 className="text-gray-700 dark:text-gray-200 text-3xl font-medium">Manage {activePage}</h3>
              <div className="mt-8">
                <CreateSectionForm activePage={activePage} onCreateSection={handleCreateSection} />
                {/* <PageSections
                  activePage={activePage}
                  sections={sections[activePage]}
                  onEdit={(id: number, newData: Partial<Section>) => {
                    setSections(prevSections => ({
                      ...prevSections,
                      [activePage]: prevSections[activePage].map(section =>
                        section.id === id ? { ...section, ...newData } : section
                      )
                    }))
                  }}
                  onDelete={(id: number) => {
                    setSections(prevSections => ({
                      ...prevSections,
                      [activePage]: prevSections[activePage].filter(section => section.id !== id)
                    }))
                  }}
                  onImageUpload={(id: number, file: File) => {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setSections(prevSections => ({
                        ...prevSections,
                        [activePage]: prevSections[activePage].map(section =>
                          section.id === id ? { ...section, image: reader.result as string } : section
                        )
                      }))
                    }
                    reader.readAsDataURL(file)
                  }}
                /> */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
