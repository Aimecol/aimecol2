"use client";

import { useEffect, useRef, useState, type ElementType, type MouseEvent } from "react";
import { useTheme } from "next-themes";
import { ArrowRight, Link, Zap, Calendar, Code, FileText, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

const categoryIconMap: Record<string, ElementType> = {
  Planning: Calendar,
  Design: FileText,
  Development: Code,
  Testing: User,
  Release: Clock,
};

const ROTATION_INTERVAL_MS = 16;
const ROTATION_STEP_DEGREES = 0.1;

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

// Theme presets for dark and light modes
const themePresets = {
  dark: {
    bg: "bg-background",
    centerGradient: "from-purple-500 via-blue-500 to-teal-500",
    centerInnerBg: "bg-white/80",
    orbitBorder: "border-white/10",
    orbitOuterBg: "absolute w-96 h-96 rounded-full border border-white/10",
    nodeDefault: "bg-black text-white border-white/40",
    nodeExpanded: "bg-white text-black border-white",
    nodeRelated: "bg-white/50 text-black border-white",
    nodeShadow: "shadow-white/30",
    nodeTitle: "text-white/70",
    nodeTitleExpanded: "text-white",
    cardBg: "bg-black/90",
    cardBorder: "border-white/30",
    cardShadow: "shadow-white/10",
    badge: {
      completed: "text-white bg-black border-white",
      inProgress: "text-black bg-white border-black",
      pending: "text-white bg-black/40 border-white/50",
    },
    cardText: "text-white/80",
    cardSubtext: "text-white/50",
    borderDivider: "border-white/10",
    energyBar: "bg-gradient-to-r from-blue-500 to-purple-500",
    energyBg: "bg-white/10",
    connectionBorder: "border-white/20",
    connectionText: "text-white/80",
    connectionHover: "hover:bg-white/10",
    arrowText: "text-white/60",
    pulsePin: "absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70",
    pulsePinDelay: "absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50",
    energyLabel: "text-white/70",
    connectedNodesLabel: "text-white/70",
    pulseRadial: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
  },
  light: {
    bg: "bg-background",
    centerGradient: "from-purple-600 via-blue-600 to-teal-600",
    centerInnerBg: "bg-white/90",
    orbitBorder: "border-black/20",
    orbitOuterBg: "absolute w-96 h-96 rounded-full border border-black/10",
    nodeDefault: "bg-white text-black border-black/40",
    nodeExpanded: "bg-black text-white border-black",
    nodeRelated: "bg-black/40 text-white border-black",
    nodeShadow: "shadow-black/30",
    nodeTitle: "text-black/70",
    nodeTitleExpanded: "text-black",
    cardBg: "bg-white/90",
    cardBorder: "border-black/20",
    cardShadow: "shadow-black/10",
    badge: {
      completed: "text-black bg-white border-black",
      inProgress: "text-white bg-black border-white",
      pending: "text-black bg-white/40 border-black/50",
    },
    cardText: "text-black/80",
    cardSubtext: "text-black/50",
    borderDivider: "border-black/10",
    energyBar: "bg-gradient-to-r from-blue-600 to-purple-600",
    energyBg: "bg-black/10",
    connectionBorder: "border-black/20",
    connectionText: "text-black/80",
    connectionHover: "hover:bg-black/10",
    arrowText: "text-black/60",
    pulsePin: "absolute w-20 h-20 rounded-full border border-black/20 animate-ping opacity-70",
    pulsePinDelay: "absolute w-24 h-24 rounded-full border border-black/10 animate-ping opacity-50",
    energyLabel: "text-black/70",
    connectedNodesLabel: "text-black/70",
    pulseRadial: "radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%)",
  },
};

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number}>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Ensure hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get current theme preset
  const getCurrentTheme = () => {
    if (!mounted) return themePresets.dark;
    return theme === "light" ? themePresets.light : themePresets.dark;
  };

  const currentTheme = getCurrentTheme();

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval> | undefined;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + ROTATION_STEP_DEGREES) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, ROTATION_INTERVAL_MS);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return currentTheme.badge.completed;
      case "in-progress":
        return currentTheme.badge.inProgress;
      case "pending":
        return currentTheme.badge.pending;
      default:
        return currentTheme.badge.pending;
    }
  };

  return (
    <div
      className={`w-full h-screen md:h-[800px] flex flex-col items-center justify-center ${currentTheme.bg} overflow-hidden transition-colors duration-300`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Project <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-xl text-foreground-secondary mb-8">
            Visualizing the journey from concept to launch
          </p>
        </div>
      </div>
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className={`absolute w-16 h-16 rounded-full bg-gradient-to-br ${currentTheme.centerGradient} animate-pulse flex items-center justify-center z-10 transition-all duration-300`}>
            <div className={`${currentTheme.pulsePin} transition-all duration-300`}></div>
            <div
              className={`${currentTheme.pulsePinDelay} transition-all duration-300`}
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className={`w-8 h-8 rounded-full ${currentTheme.centerInnerBg} backdrop-blur-md transition-all duration-300`}></div>
          </div>

          <div className={`${currentTheme.orbitOuterBg} transition-all duration-300`}></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = categoryIconMap[item.category] || Zap;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)` as const,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  } transition-all duration-300`}
                  style={{
                    background: currentTheme.pulseRadial,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? currentTheme.nodeExpanded
                      : isRelated
                      ? currentTheme.nodeRelated
                      : currentTheme.nodeDefault
                  }
                  border-2 
                  ${
                    isExpanded
                      ? `${currentTheme.nodeExpanded} ${currentTheme.nodeShadow}`
                      : isRelated
                      ? "animate-pulse"
                      : ""
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12  whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? `${currentTheme.nodeTitleExpanded} scale-125` : currentTheme.nodeTitle}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className={`absolute top-20 left-1/2 -translate-x-1/2 w-64 ${currentTheme.cardBg} backdrop-blur-lg ${currentTheme.cardBorder} shadow-xl ${currentTheme.cardShadow} overflow-visible transition-all duration-300`}>
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 ${currentTheme.cardSubtext} opacity-50`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )} transition-all duration-300`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className={`text-xs font-mono ${currentTheme.cardSubtext} transition-all duration-300`}>
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className={`text-sm mt-2 transition-all duration-300 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={`text-xs ${currentTheme.cardText} transition-all duration-300`}>
                      <p>{item.content}</p>

                      <div className={`mt-4 pt-3 border-t ${currentTheme.borderDivider} transition-all duration-300`}>
                        <div className={`flex justify-between items-center text-xs mb-1 ${currentTheme.energyLabel}`}>
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className={`w-full h-1 ${currentTheme.energyBg} rounded-full overflow-hidden transition-all duration-300`}>
                          <div
                            className={currentTheme.energyBar}
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className={`mt-4 pt-3 border-t ${currentTheme.borderDivider} transition-all duration-300`}>
                          <div className="flex items-center mb-2">
                            <Link size={10} className={`${currentTheme.connectedNodesLabel} mr-1 transition-all duration-300`} />
                            <h4 className={`text-xs uppercase tracking-wider font-medium ${currentTheme.connectedNodesLabel} transition-all duration-300`}>
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className={`flex items-center h-6 px-2 py-0 text-xs rounded-none ${currentTheme.connectionBorder} bg-transparent ${currentTheme.connectionHover} ${currentTheme.connectionText} hover:text-current transition-all duration-300`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className={`ml-1 ${currentTheme.arrowText} transition-all duration-300`}
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
