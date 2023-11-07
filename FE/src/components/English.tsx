import styled from "styled-components";
import EBG from "../assets/englishBg.jpg";
import letters from "../tools/letters.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import lodash from "lodash";

export const English = () => {
  const [state, setState] = useState<Array<any>>([]);

  useEffect(() => {
    const shuffle = lodash.shuffle(letters);
    setState(shuffle);
  }, []);

  const onDrag = (res: any) => {
    const data = Array.from(state);

    const { source, destination } = res;

    const [newData] = data.splice(source.index, 1);
    data.splice(destination.index, 0, newData);

    setState(data);
  };

  const check = lodash.isEqual(letters, state);

  return (
    <div>
      <DragDropContext onDragEnd={onDrag}>
        <Container>
          <Wrapper>
            {check ? <C>Congrats</C> : null}
            <Holder>
              <Txt>
                Arrange the words on the left according to the vowel sounds on
                the right
              </Txt>
              <Flex>
                <Droppable droppableId="dragging">
                  {(prov) => (
                    <DNDHolder
                      w="200px"
                      ref={prov.innerRef}
                      {...prov.droppableProps}
                    >
                      {state.map((el, i: number) => (
                        <Draggable key={el.id} index={i} draggableId={el.id}>
                          {(prov) => (
                            <Num
                              key={el.id}
                              {...prov.dragHandleProps}
                              {...prov.draggableProps}
                              ref={prov.innerRef}
                            >
                              {" "}
                              {el.let}
                            </Num>
                          )}
                        </Draggable>
                      ))}
                      {prov.placeholder}
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
                  {letters.map((el: any) => (
                    <Num key={el.id}>{el.ans}</Num>
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
  color: white;
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

const Num = styled.div`
  font-size: 50px;
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
  gap: 5px;
`;

const Holder = styled.div`
  background-color: #7974b2;
  width: 800px;
  height: 500px;
  border: 8px solid white;

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
  background-image: url(${EBG});
  background-size: cover;
  background-repeat: no-repeat;
`;
