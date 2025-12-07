import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Route, Zap, Eye, Sliders, Github, Twitter } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
        {/* Dynamic Background */}
        <div className="absolute inset-0 -z-10 bg-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-8 text-center lg:text-left"
            >
              {/* <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                v1.0 Now Available
              </motion.div> */}
              
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground"
              >
                Visualize <br />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Algorithms</span> <br />
                Like Never Before.
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="max-w-xl mx-auto lg:mx-0 text-xl text-muted-foreground leading-relaxed"
              >
                Master complex data structures and algorithms through interactive, 
                step-by-step visualizations. Perfect for students and developers.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <Link href="/sorting">
                  <a className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 group w-full sm:w-auto">
                    Start Sorting
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Link>
                <Link href="/pathfinding">
                  <a className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-foreground bg-background/50 backdrop-blur-sm rounded-full hover:bg-muted/50 transition-all border border-border w-full sm:w-auto">
                    Explore Pathfinding
                  </a>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Abstract Node Graph Animation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-purple-500/10 rounded-3xl rotate-3"></div>
                <div className="absolute inset-0 bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col -rotate-3 hover:rotate-0 transition-transform duration-500">
                   <div className="flex items-center gap-2 mb-4 border-b border-border/50 pb-4">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                      </div>
                      <div className="text-xs text-muted-foreground font-mono ml-2">sorting_visualizer.ts</div>
                   </div>
                   <div className="space-y-2 font-mono text-sm text-muted-foreground/80">
                      <div className="flex"><span className="text-purple-500 mr-2">function</span><span className="text-blue-500">quickSort</span>(arr) {'{'}</div>
                      <div className="pl-4">if (arr.length {'<='} 1) return arr;</div>
                      <div className="pl-4">const pivot = arr[arr.length - 1];</div>
                      <div className="pl-4 text-green-500/80">// Sorting logic...</div>
                      <div className="pl-4">const left = [];</div>
                      <div className="pl-4">const right = [];</div>
                      <div className="pl-4 animate-pulse bg-primary/10 w-fit px-1 rounded">return [...quickSort(left), pivot, ...quickSort(right)];</div>
                      <div>{'}'}</div>
                   </div>
                   
                   {/* Floating Elements */}
                   <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute bottom-8 right-8 p-4 bg-primary text-primary-foreground rounded-xl shadow-lg z-10"
                   >
                     <BarChart3 className="h-6 w-6" />
                   </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Sorting Card */}
            <Link href="/sorting">
              <a className="group relative block p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="p-3 bg-primary/10 w-fit rounded-lg mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Sorting Algorithms</h3>
                    <p className="text-muted-foreground mb-4">
                      Compare Quick, Merge, Heap and other sorting algorithms side-by-side. 
                      Control speed and array size in real-time.
                    </p>
                    <span className="text-sm font-medium text-primary flex items-center">
                      Try it out <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            </Link>

            {/* Pathfinding Card */}
            <Link href="/pathfinding">
              <a className="group relative block p-8 bg-card rounded-2xl border border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="p-3 bg-blue-500/10 w-fit rounded-lg mb-4 text-blue-500 group-hover:scale-110 transition-transform duration-300">
                      <Route className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors">Pathfinding</h3>
                    <p className="text-muted-foreground mb-4">
                      Visualize A*, Dijkstra, BFS, and DFS finding the shortest path 
                      through complex mazes and weighted graphs.
                    </p>
                    <span className="text-sm font-medium text-blue-500 flex items-center">
                      Start mapping <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why AlgoVisualizer?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for students, developers, and visual learners who want to deeply understand algorithmic concepts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Eye className="h-6 w-6" />,
                title: "Visual Learning",
                desc: "Forget static diagrams. Watch algorithms process data in real-time with color-coded steps.",
                color: "text-purple-500",
                bg: "bg-purple-500/10"
              },
              {
                icon: <Sliders className="h-6 w-6" />,
                title: "Fully Interactive",
                desc: "Don't just watch. Pause, step through, adjust speeds, and generate custom test cases.",
                color: "text-amber-500",
                bg: "bg-amber-500/10"
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Instant Feedback",
                desc: "See immediate results of complexity differences between algorithms on the same dataset.",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className={`p-4 rounded-full ${feature.bg} ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-lg">AlgoVisualizer</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
