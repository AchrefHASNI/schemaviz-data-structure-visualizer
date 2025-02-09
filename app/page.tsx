"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonVisualizer } from "@/components/json-visualizer";
import { SqlVisualizer } from "@/components/sql-visualizer";
import { FileText, Database } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-togle";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-background p-8">
        <div className="flex justify-between sticky top-0 mb-2 bg-background">
          <Image src={"/schemaviz.png"}  alt="schemaviz" width={50} height={50}/>
          <div className="flex justify-end" >

          <Link href={"https://github.com/AchrefHASNI"} title="achref hasni" target="_blank">
            <Button variant="ghost" size="icon">
              <IconBrandGithub className="w-5 h-5 neon-icon" />
            </Button>
          </Link>
          <ModeToggle />
          </div>
        </div>
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-center mb-8">
            Data <span className="text-purple-400">Structure</span> Visualizer
          </h1>

          <Tabs defaultValue="json" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="json" className="flex items-center gap-2">
                <FileText className="w-4 h-4 neon-icon" />
                JSON
              </TabsTrigger>
              <TabsTrigger value="sql" className="flex items-center gap-2">
                <Database className="w-4 h-4 neon-icon" />
                SQL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="json" className="mt-6">
              <JsonVisualizer />
            </TabsContent>

            <TabsContent value="sql" className="mt-6">
              <SqlVisualizer />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}