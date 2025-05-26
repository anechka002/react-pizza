import type { RootState } from "@/app/redux/store"
import { useSelector } from "react-redux"

export const useAppSelector = useSelector.withTypes<RootState>()
