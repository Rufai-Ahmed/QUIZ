import styled from "styled-components";
import SBG from "../assets/shapeBg.jpg";
import shapes from "../tools/shapes.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { shuffle, isEqual } from "lodash";

export const Shapes = () => {
  const [state, setState] = useState<Array<any>>([]);

  useEffect(() => {
    const shuffled = shuffle(shapes);
    setState(shuffled);
  }, []);

  const onDrag = (res: any) => {
    const { source, destination } = res;

    const newArr = Array.from(state);

    const [removed] = newArr.splice(source.index, 1);

    newArr.splice(destination.index, 0, removed);

    setState(newArr);
  };

  const check = isEqual(shapes, state);

  return (
    <div>
      <DragDropContext onDragEnd={onDrag}>
        <Container>
          <Wrapper>
            {check ? <C>Congrats</C> : null}
            <Holder>
              <Txt>
                Arrange the words on the left according to the shape that
                matches on the right
              </Txt>
              <Flex>
                <Droppable droppableId="dragged">
                  {(props) => (
                    <DNDHolder
                      w="200px"
                      ref={props.innerRef}
                      {...props.droppableProps}
                    >
                      {state.map((el, i: number) => (
                        <Draggable draggableId={el.id} key={el.id} index={i}>
                          {(prov) => (
                            <Num
                              w=""
                              h=""
                              src=""
                              key={el.id}
                              ref={prov.innerRef}
                              {...prov.dragHandleProps}
                              {...prov.draggableProps}
                            >
                              {el.ans}
                            </Num>
                          )}
                        </Draggable>
                      ))}
                      {props.placeholder}
                    </DNDHolder>
                  )}
                </Droppable>
                <Equal>
                  <div>= </div>
                  <div>= </div>
                  <div>= </div>
                  <div>= </div>
                  <div>= </div>
                </Equal>
                <DNDHolder w="200px">
                  {shapes.map((el) => (
                    <Num w="50px" h="50px" src={el.shape}></Num>
                  ))}
                </DNDHolder>
              </Flex>
            </Holder>
          </Wrapper>
        </Container>
      </DragDropContext>
    </div>
  );
};

const C = styled.div`
  position: absolute;
  top: 30px;
  font-size: 40px;
  color: #3e3c49;
`;

const Equal = styled.div`
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  color: white;
`;

const Num = styled.div<{ src: string; w: string; h: string }>`
  font-size: 40px;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  width: ${({ w }) => w};
  height: ${({ h }) => h};
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  gap: 50px;
`;

const Txt = styled.div`
  font-size: 20px;
  color: white;
`;

const DNDHolder = styled.div<{ w: string }>`
  width: ${({ w }) => w};
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const Holder = styled.div`
  background-color: #ff501e;
  width: 800px;
  height: 500px;
  border: 8px solid #3e3c49;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${SBG});
  background-size: cover;
  background-repeat: no-repeat;
`;
