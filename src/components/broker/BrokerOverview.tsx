
import React from 'react';
import BrokerCard from './BrokerCard';
import { brokers } from '../../data/brokerData';

interface BrokerOverviewProps {
  selectedBroker: string | null;
  setSelectedBroker: (id: string | null) => void;
}

const BrokerOverview: React.FC<BrokerOverviewProps> = ({ selectedBroker, setSelectedBroker }) => {
  const handleBrokerToggle = (brokerId: string) => {
    setSelectedBroker(selectedBroker === brokerId ? null : brokerId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {brokers.map((broker) => (
        <BrokerCard
          key={broker.id}
          broker={broker}
          isExpanded={selectedBroker === broker.id}
          onToggle={() => handleBrokerToggle(broker.id)}
        />
      ))}
    </div>
  );
};

export default BrokerOverview;
