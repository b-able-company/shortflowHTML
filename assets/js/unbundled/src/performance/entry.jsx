const t = BASE_TOKENS;

    function Flow() {
      const [screen, setScreen] = React.useState(() => {
        try {
          const s = localStorage.getItem('perf.screen');
          return s ? JSON.parse(s) : { name: 'list', contentId: null };
        } catch (e) { return { name: 'list', contentId: null }; }
      });
      React.useEffect(() => {
        try { localStorage.setItem('perf.screen', JSON.stringify(screen)); } catch (e) {}
        window.scrollTo(0, 0);
      }, [screen]);

      if (screen.name === 'detail') {
        return (
          <PerfDetailAccordion
            t={t}
            contentId={screen.contentId}
            onBack={() => setScreen({ name: 'list', contentId: null })}
          />
        );
      }
      return (
        <PerfListCompact
          t={t}
          onOpen={(id) => setScreen({ name: 'detail', contentId: id })}
        />
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<Flow />);
