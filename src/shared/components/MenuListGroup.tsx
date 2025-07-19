interface MenuItem {
  label: string;
  onClick: () => void;
}

interface MenuListGroupProps {
  items: MenuItem[];
}

export const MenuListGroup = ({ items }: MenuListGroupProps) => {
  return (
    <div>
      {items.map((item, index) => {
        const isOnlyOne = items.length === 1;
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const borderRadius = isOnlyOne
          ? 'rounded-2xl'
          : isFirst
            ? 'rounded-t-2xl'
            : isLast
              ? 'rounded-b-2xl'
              : '';

        return (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`flex w-full justify-between bg-[#22252E] items-center h-14 p-4 ${borderRadius}`}
          >
            <span>{item.label}</span>
            <span>&gt;</span>
          </button>
        );
      })}
    </div>
  );
};
