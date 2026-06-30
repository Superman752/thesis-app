'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Deal, PipelineStatus } from '@/lib/types';
import DealCard from './DealCard';

interface PipelineBoardProps {
  deals: Deal[];
  onStatusChange?: (dealId: string, newStatus: PipelineStatus) => void;
}

const cardListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

const columns: { id: PipelineStatus; label: string; color: string; dimBg: string }[] = [
  { id: 'new',               label: 'New',              color: 'var(--blue)',   dimBg: 'rgba(99,102,241,0.10)'  },
  { id: 'under_review',      label: 'Under Review',     color: 'var(--brand)',  dimBg: 'var(--brand-dim)'       },
  { id: 'meeting_scheduled', label: 'Meeting Sched.',   color: 'var(--amber)',  dimBg: 'var(--amber-dim)'       },
  { id: 'active_diligence',  label: 'Active Diligence', color: 'var(--green)',  dimBg: 'var(--green-dim)'       },
  { id: 'passed',            label: 'Passed',           color: 'var(--muted2)', dimBg: 'rgba(161,161,170,0.07)' },
];

export default function PipelineBoard({ deals, onStatusChange }: PipelineBoardProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<PipelineStatus | null>(null);

  const dealsByStatus = (status: PipelineStatus) =>
    deals.filter((d) => d.pipelineStatus === status);

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    setDraggingId(dealId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, status: PipelineStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(status);
  };

  const handleDrop = (e: React.DragEvent, status: PipelineStatus) => {
    e.preventDefault();
    if (draggingId && onStatusChange) onStatusChange(draggingId, status);
    setDraggingId(null);
    setDragOverCol(null);
  };

  const handleDragEnd = () => { setDraggingId(null); setDragOverCol(null); };

  return (
    /* Board container: fixed height, horizontal scroll, flex row */
    <div
      style={{
        height: 'calc(100vh - 220px)',
        display: 'flex',
        gap: 12,
        overflowX: 'auto',
        paddingBottom: 16,
        alignItems: 'stretch',
      }}
    >
      {columns.map((col) => {
        const colDeals = dealsByStatus(col.id);
        const isOver = dragOverCol === col.id;

        return (
          <div
            key={col.id}
            style={{
              flexShrink: 0,
              width: 240,
              minHeight: 'calc(100vh - 220px)',
              background: isOver ? 'rgba(212,160,23,0.04)' : 'var(--surface2)',
              border: `1px solid ${isOver ? col.color : 'var(--border)'}`,
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              transition: 'border-color 0.15s, background 0.15s',
              boxShadow: 'var(--shadow-sm)',
            }}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDrop={(e) => handleDrop(e, col.id)}
            onDragLeave={() => setDragOverCol(null)}
          >
            {/* Column header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderBottom: '1px solid var(--border)',
                flexShrink: 0,
                background: 'var(--surface)',
                borderRadius: '8px 8px 0 0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: col.color,
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)' }}>
                  {col.label}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: 6,
                  color: col.color,
                  background: col.dimBg,
                }}
              >
                {colDeals.length}
              </span>
            </div>

            {/* Cards list: only takes space it needs */}
            {colDeals.length > 0 && (
              <motion.div
                variants={cardListVariants}
                initial="hidden"
                animate="visible"
                style={{ padding: '8px 8px 4px', display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                {colDeals.map((deal) => (
                  <motion.div
                    key={deal.id}
                    variants={cardItemVariants}
                    onDragEnd={handleDragEnd}
                    style={{ opacity: draggingId === deal.id ? 0.35 : 1, transition: 'opacity 0.1s' }}
                  >
                    <DealCard deal={deal} draggable onDragStart={handleDragStart} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Drop zone: always present, fills remaining column height */}
            <div
              style={{
                flex: 1,
                margin: '8px',
                minHeight: 80,
                border: '1.5px dashed var(--border2)',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--muted3)',
                  userSelect: 'none',
                }}
              >
                Drop here
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
