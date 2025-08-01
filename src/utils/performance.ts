export const measurePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      request: navigation.responseStart - navigation.requestStart,
      response: navigation.responseEnd - navigation.responseStart,
      totalTime: navigation.loadEventEnd - navigation.fetchStart,
    };
  }
  
  return null;
};

export const logPerformanceMetrics = () => {
  const metrics = measurePerformance();
  if (metrics) {
    console.group('🚀 Performance Metrics');
    console.log('DOM Content Loaded:', `${metrics.domContentLoaded}ms`);
    console.log('Load Complete:', `${metrics.loadComplete}ms`);
    console.log('DNS Lookup:', `${metrics.dns}ms`);
    console.log('TCP Connection:', `${metrics.tcp}ms`);
    console.log('Request Time:', `${metrics.request}ms`);
    console.log('Response Time:', `${metrics.response}ms`);
    console.log('Total Load Time:', `${metrics.totalTime}ms`);
    console.groupEnd();
  }
};

export const getBreakpoint = (): 'mobile' | 'tablet' | 'desktop' | 'large-desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1440) return 'desktop';
  return 'large-desktop';
};

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const getMemoryUsage = () => {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: Math.round(memory.usedJSHeapSize / 1048576),
      total: Math.round(memory.totalJSHeapSize / 1048576),
      limit: Math.round(memory.jsHeapSizeLimit / 1048576),
    };
  }
  return null;
};

export const createOptimizedImageUrl = (src: string, _width?: number, _quality = 80): string => {
  return src;
};

export const createLazyLoadObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.1,
    }
  );
};