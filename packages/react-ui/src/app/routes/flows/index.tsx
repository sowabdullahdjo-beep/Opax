import { FlowsTable } from './flows-table';
import { CommandCenterHero } from './command-center-hero';

const FlowsPage = () => {
  return (
    <div className="space-y-6">
      <CommandCenterHero />
      <FlowsTable />
    </div>
  );
};

export { FlowsPage };
