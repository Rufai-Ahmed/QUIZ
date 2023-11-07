import styled from "styled-components";
import CBG from "../assets/cross.jpg";
import puzzle from "../tools/puzzle.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import lodash from "lodash";

export const CrossWord = () => {
  const [state, setState] = useState<Array<any>>([]);

  useEffect(() => {
    const shuffled = lodash.shuffle(puzzle);
    setState(shuffled);
  }, []);

  const onDrag = (res: any) => {
    const { source, destination } = res;

    const data = Array.from(state);

    const [newArr] = data.splice(source.index, 1);

    data.splice(destination.index, 0, newArr);

    setState(data);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDrag}>
        <Container>
          <Wrapper>
            <Holder>
              <Txt>
                Arrange the words on the left according to the vowel sounds on
                the right
              </Txt>
              <Droppable droppableId="dropped">
                {(prov) => (
                  <Grid ref={prov.innerRef} {...prov.droppableProps}>
                    {state.map((el, i) => (
                      <Draggable draggableId={el.id} index={i} key={el.id}>
                        {(prov) => (
                          <Item
                            ref={prov.innerRef}
                            {...prov.dragHandleProps}
                            {...prov.draggableProps}
                            key={el.id}
                          >
                            {el.txt}
                          </Item>
                        )}
                      </Draggable>
                    ))}
                    {prov.placeholder}
                  </Grid>
                )}
              </Droppable>
              Hint: All are three letter words
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

const Item = styled.div`
  background-color: white;
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;
  text-transform: capitalize;
  color: black;
`;

const Grid = styled.div`
  width: 400px;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 40px 0;
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
  background-color: #641f2e;
  width: 800px;
  height: 500px;
  border: 8px solid white;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;

  color: white;
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
  background-image: url(${CBG});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
