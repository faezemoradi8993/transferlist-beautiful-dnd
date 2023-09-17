import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { RootState, move } from '../../stores';

const TransferList: React.FC = () => {
    // <------------- Redux -------------->
    const columns = useSelector((state: RootState) => state.columns);
    const dispatch = useDispatch();

    // <------------- Functions -------------->
    const onDrag = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        const taskId = result.draggableId;
        const sourceColumnId = source.droppableId;
        const destinationColumnId = destination.droppableId;
        const index = destination.index;
        dispatch(move({ taskId, source: sourceColumnId, destination: destinationColumnId, index }));
    };

    // <------------- Render Component -------------->
    return (
        <div className='w-screen h-screen  flex flex-col items-center justify-center p-2 md:p-5  bg-red-100'>
            <h1 className='text-center font-bold text-lg mb-2 md:mb-4 bg-red-200 border border-white w-full py-4'>Transfer List</h1>
            <div className='flex items-start justify-center w-full flex-1 max-w-[800px] max-h-screen '>
                <DragDropContext onDragEnd={onDrag}>
                    {Object.entries(columns).map(([columnId, column]) => {
                        return (
                            <div
                                className='flex flex-col items-center justify-center mx-1 md:mx-2 w-1/2'
                                key={columnId}
                            >
                                <h2 className='font-bold bg-white rounded-t-lg text-center py-2 md:py-5 mb-1 w-full '>{column.name}</h2>
                                <div className='w-full'>
                                    <Droppable droppableId={columnId} key={columnId}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className={`${snapshot.isDraggingOver ? ' bg-blue-100 ' : ' bg-gray-100 '} transition-all rounded-b-lg p-2 md:p-8  min-h-[80vh] w-full `}
                                                >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className={`text-center p-1 md:p-4 mb-1 md:mb-4 text-sm md min-h-[30px] md:min-h-[50px] rounded-md text-white transition-all ${snapshot.isDragging ? 'bg-[#263B4A]' : 'bg-[#456C86]'}`}

                                                                        >
                                                                            {item.content}
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
};

export default TransferList;
