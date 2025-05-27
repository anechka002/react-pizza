import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss'
import { useAppDispatch } from '@/common/hooks';
import { setCurrentPage } from '@/app/redux/slices/filterSlice';

type Props = {
  currentPage: number;
}

export const Pagination = ({currentPage}: Props) => {
  const dispatch = useAppDispatch()

  const handleOnChangePage = (pageNumber: number) => {
    dispatch(setCurrentPage({value: pageNumber}))
  }

  return (
    <ReactPaginate
      className={s.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={event => handleOnChangePage(event.selected + 1)}
      // onPageChange={event => console.log(event)}
      pageRangeDisplayed={5}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
