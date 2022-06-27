import { useState, ChangeEvent } from "react"
import { Column, Mapper, ColumnType, TableListAction } from "./types"
import * as Styled from "./styles"
import { Action } from "./Action"
import ImagePreview from "src/components/TableList/ImagePreview"
import { useHistory } from "react-router-dom"
import Rating from "./Rating"


interface Props {
  onCheckBoxChangeAll?: (checked: boolean) => void;
  onAction: (type: string, id: number) => void;
  selectedOptions?: number[];
  onCheckBoxChange?: (data: any) => void;
}

const useTableList = ({ onCheckBoxChangeAll, onAction, selectedOptions = [], onCheckBoxChange = () => undefined, }: Props) => {
  const [checked, setChecked] = useState(false);
  const history = useHistory()

  const handleHeaderCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckBoxChangeAll) onCheckBoxChangeAll(checked)
    // eslint-disable-next-line no-param-reassign
    setChecked(event.target.checked);
  };

  const getColor = (columnValue: string, colorMapping?: Mapper<any>[]) => {
    const color = colorMapping?.find((c) => c.key === columnValue)?.value
    return color || '#F68B1E'
  }

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const obj = JSON.parse(event.target.value)
    onCheckBoxChange(obj)
  }

  const formatValue = (
    column: Column,
    value: any,
    id: number,
    colorMapping?: Mapper<any>[]
  ) => {
    switch (column.type) {
      case ColumnType.ActionComponent:
        return (
          <Styled.ActionContainer>
            {Array.isArray(value) ? (
              value.map((action: TableListAction) => (
                <Action
                  key={action.event}
                  {...action}
                  onClick={() => onAction(action.event, id)}
                />
              ))
            ) : (
              <Action
                key={value.event}
                {...value}
                onClick={() => onAction(value.event, id)}
              />
            )}
          </Styled.ActionContainer>
        )
      case ColumnType.Chip: {
        return (
          <Styled.TableChip bgColor={getColor(value, colorMapping)}>
            {value}
          </Styled.TableChip>
        )
      }
      case ColumnType.Image: {
        return <ImagePreview width="50px" height="50px" src={value} />
      }
      case ColumnType.Rating: {
        return <Rating individualRating={parseFloat(value)} />
      }
      case ColumnType.CheckBox: {
        return (
          <Styled.CheckboxContainer
            value={JSON.stringify(value)}
            checked={selectedOptions.includes(value)}
            onChange={handleCheckBoxChange}
          />
        )
      }
      default:
        return value
    }
  }

  return { checked, handleHeaderCheckBoxChange, formatValue, history }
}

export default useTableList