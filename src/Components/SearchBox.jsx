import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { pages } from "./pages"; // Import the pages data

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Debounce logic: Update debouncedSearchTerm after a delay when searchTerm changes
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler); // Cleanup timeout
        };
    }, [searchTerm]);

    // Filter pages based on the debounced search term
    useEffect(() => {
        if (debouncedSearchTerm.trim()) {
            const filteredResults = pages.filter((page) => {
                const term = debouncedSearchTerm.toLowerCase();
                return (
                    page.title.toLowerCase().includes(term) ||
                    page.content.toLowerCase().includes(term)
                );
            });
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]); // Clear results if search term is empty
        }
    }, [debouncedSearchTerm]);

    return (
        <div className="">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="p-0">
                        <div className="relative">
                            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                                <Search className="h-4 w-4" />
                            </div>
                            <Input id="search" type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8" />
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Search</DialogTitle>
                        <DialogDescription>Type to search through the page content.</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <Input
                            id="dialog-search"
                            type="text"
                            placeholder="Start typing..."
                            className="w-full rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 space-y-2">
                        {searchResults.length > 0 ? (
                            searchResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="p-4 border rounded-lg shadow-xs hover:shadow-md"
                                >
                                    <a
                                        href={result.url}
                                        className="text-blue-600 hover:underline"
                                        // target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <h3 className="font-semibold">{result.title}</h3>
                                    </a>
                                    <p className="text-sm text-gray-600">{result.content}</p>
                                </div>
                            ))
                        ) : (
                            debouncedSearchTerm && (
                                <p className="text-gray-500">No results found for "{debouncedSearchTerm}"</p>
                            )
                        )}
                    </div>
                    <DialogClose asChild>
                        <Button variant="outline" className="mt-4">
                            Close
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default SearchBox;
