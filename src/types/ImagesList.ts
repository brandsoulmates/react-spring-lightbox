export type ImagesListItem = Omit<
    React.HTMLProps<HTMLImageElement>,
    'draggable' | 'onClick' | 'onDragStart' | 'ref'
> & {
    alt: string;
    component: React.Component;
    loading?: 'auto' | 'eager' | 'lazy';
    src: string;
};

export type ImagesList = ImagesListItem[];
