import { Note } from '@/types';
import React from 'react';
import Badge from '../common/Badge';

interface NoteListProps {
  list: Omit<Note, 'fragranceId'>[];
  position: string;
}

interface NotePosition {
  [key: string]: {
    name: string;
    description: string;
  };
}

const notePosition: NotePosition = {
  top: {
    name: '탑노트',
    description: '탑노트는 향수를 뿌린 후 발향의 시작과 동시에 느낄 수 있는 향으로 약 30분 이하의 시간동안 지속됨',
  },
  middle: {
    name: '미들노트',
    description: '미들노트는 탑노트가 사라지며 나는 향으로 하트노트라고도 불리며 약 1시간 정도 지속됨',
  },
  base: {
    name: '베이스노트',
    description: '베이스노트는 라스트노트, 잔향이라고 불리며 향수 종류에 따라 지속시간이 다름',
  },
};

function NoteBadges({ list, position }: NoteListProps) {
  return (
    <div className="flex flex-col text-stone-600 gap-3">
      <div className="text-xl font-bold max-sm:text-lg max-xs:text-base">{notePosition[position].name}</div>
      <div className="max-sm:text-sm max-xs:text-xs">{notePosition[position].description}</div>
      <div className="flex gap-3 font-bold max-sm:text-sm max-sm:gap-2 max-xs:text-xs max-xs:gap-1.5">
        {list.map((note) => (
          <Badge key={note.id} text={note.name} mode="basic" />
        ))}
      </div>
    </div>
  );
}

export default NoteBadges;
