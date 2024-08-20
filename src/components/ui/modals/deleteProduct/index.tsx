import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Modal Delete Component
const ModalDelete = ({ onDeleteConfirm }: { onDeleteConfirm?: () => void }) => (
    <Dialog>
        <DialogTrigger>
            <Button variant="outline" className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                Delete
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm mx-auto p-6 bg-white rounded-md shadow-lg">
            <DialogHeader className="text-center">
                <div className="flex justify-center items-center mb-4">
                    <div className="bg-red-100 rounded-full p-3">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0-4h.01M12 12h.01M12 12a9 9 0 100-18 9 9 0 000 18zm0 4v2m0 0h.01M12 22v2m0-2h.01M12 12a9 9 0 100-18 9 9 0 000 18zm0 4v2m0 0h.01M12 22v2m0-2h.01" />
                        </svg>
                    </div>
                </div>
                <DialogTitle className="text-xl font-semibold text-gray-900">Delete item</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-between gap-4 mt-6">
                <Button variant="outline" className="w-full h-10 border border-gray-300 text-gray-700 hover:bg-gray-100">
                    Cancel
                </Button>
                <Button onClick={onDeleteConfirm} variant="destructive" className="w-full h-10 bg-red-500 text-white hover:bg-red-600">
                    Delete
                </Button>
            </div>
        </DialogContent>
    </Dialog>
);

export default ModalDelete;
